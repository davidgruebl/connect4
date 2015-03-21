var React = require('react/addons')
var _ = require('lodash')

var Column = require('./column.jsx')
var detectWin = require('./detect-win.js')
var Status = require('./status.jsx')
var Indicator = require('./indicator.jsx')
var Chat = require('./chat.jsx')

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
    this.props.socket.on('addcoin', this.setState.bind(this))
  },

  addCoin: function (col) {
    if (this.props.id !== this.state.next) return

    var column = this.state.fills[col]

    if (column.length >= this.props.rows) return

    column.push(this.state.next)
    this.state.next = (this.props.id + 1) % 2

    this.props.socket.emit('addcoin', this.state)
    this.setState(this.state)

    winner = detectWin(this.state.fills)
  },

  render: function () {
    let styles = {
      width: 100 * (this.props.cols + 1) + 20,
      minHeight: 100 * this.props.rows
    }

    var cols = _.map(_.range(0, this.props.cols), (idx) => {
      var props = {
        rows: this.props.rows,
        filled: this.state.fills[idx],
        addCoin: this.addCoin.bind(this, idx),
        key: idx
      }

      return <Column {...props}/>
    })

    return <div style={styles}>
      {cols}
      <div style={{
        position: 'relative',
        float: 'left',
        marginLeft: 20,
        width: 100,
        height: 100 * this.props.rows
      }}>
        <Indicator next={this.state.next} player={this.props.id} winner={winner}/>
      </div>
      <span style={{clear: 'both'}}></span>
      <Status next={this.state.next} curr={this.props.id} winner={winner}/>
      <Chat socket={this.props.socket} id={this.props.id}/>
    </div>
  }
})
