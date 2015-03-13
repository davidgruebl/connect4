var React = require('react/addons')
var _ = require('lodash')
var io = require('socket.io-client')()

var Column = require('./column.jsx')
var detectWin = require('./detect-win.js')
var Status = require('./status.jsx')

var winner = false

module.exports = React.createClass({
  getInitialState() {
    var state = {
      next: 0
    }

    state.fills = _.map(_.range(0, this.props.cols), () => {
      return []
    })

    return state
  },

  getDefaultProps() {
    return {
      cols: 7,
      rows: 6
    }
  },

  componentWillMount() {
    var self = this
    io.on('addcoin', function (state) {
      self.setState(state)
    })
  },

  addCoin: function (col) {
    if (this.props.id !== this.state.next) return

    var column = this.state.fills[col]

    if (column.length >= this.props.rows) return

    column.push(this.state.next)
    this.state.next = (this.props.id + 1) % 2

    io.emit('addcoin', this.state)
    this.setState(this.state)

    winner = detectWin(this.state.fills)
      console.log(`field.jsx: ${winner}`)
  },

  render: function () {
    var self = this

    let styles = {
      width: 100 * this.props.cols,
      height: 100 * this.props.rows,
      border: '1px solid grey'
    }

    var cols = _.map(_.range(0, this.props.cols), function(idx) {
      var props = {
        rows: self.props.rows,
        filled: self.state.fills[idx],
        addCoin: self.addCoin.bind(self, idx),
        key: idx
      }

      return <Column {...props}/>
    })

    return <div style={styles}>
      {cols}
      <Status next={this.state.next} curr={this.props.id} winner={winner}/>
    </div>
  }
})
