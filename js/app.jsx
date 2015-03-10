require('babel/register')

var React = require('react')
var _ = require('lodash')

var Column = require('./column.jsx')
var detectWin = require('./detect-win.js')

var Field = React.createClass({
  getInitialState() {
    return {
      next: 0
    }
  },

  getDefaultProps() {
    var props = {
      cols: 7,
      rows: 6
    }

    props.fills = _.map(_.range(0, props.cols), () => {
      return []
    })

    return props
  },

  addCoin: function (col) {
    var column = this.props.fills[col]

    if (column.length >= this.props.rows) return

    this.setState({
      next: this.state.next ? 0 : 1
    })

    column.push(this.state.next)
    detectWin(this.props.fills)
  },

  render: function () {
    var self = this

    let styles = {
      width: 100 * this.props.cols,
      height: 100 * this.props.rows,
      backgroundColor: 'blue'
    }

    var cols = _.map(_.range(0, this.props.cols), function(idx) {
      var props = {
        rows: self.props.rows,
        filled: self.props.fills[idx],
        addCoin: self.addCoin.bind(self, idx),
        key: idx
      }

      return <Column {...props}/>
    })

    return <div style={styles}>
      {cols}
    </div>
  }
})

React.render(<Field/>, document.querySelector('body'))
