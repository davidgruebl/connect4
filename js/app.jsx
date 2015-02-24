require('babel/register')

var React = require('react')
var _ = require('lodash')

var Coin = require('./coin.jsx')

var Field = React.createClass({

  render: function() {
    var self = this

    var margin = this.props.margin || 20
    var cellSize = 100

    var style = {
      position: 'relative',
      backgroundColor: 'blue',
      width: margin + this.props.cols * (cellSize + margin),
      height: margin + this.props.rows * (cellSize + margin)
    }

    var coins = _.map(_.range(0, this.props.cols * this.props.rows), function(val) {
      var props = {
        col: val % self.props.cols,
        row: Math.floor(val / self.props.cols),
        size: cellSize,
        margin: margin
      }

      return <Coin {...props}/>
    })

    return <div style={style}>{coins}</div>
  }
})

React.render(<Field cols="7" rows="6"/>, document.querySelector('body'))
