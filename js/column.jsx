var React = require('react/addons')
var ReactTransitionGroup = React.addons.TransitionGroup
var _ = require('lodash')

var Coin = require('./coin.jsx')

module.exports = React.createClass({
  render: function () {
    var self = this
    var style = {
      position: 'relative',
      float: 'left',
      height: 100 * this.props.rows,
      width: 100
    }

    var wrapperStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      height: 100 * this.props.rows,
      width: 100
    }

    var height = this.props.rows * 100

    var coins = _.map(this.props.filled, function (val, idx) {
      var top = height - ((idx + 1) * 100)
      return <Coin top={top} player={val} key={idx}/>
    })

    var gutterStyle = {
      width: 100,
      height: 100,
      backgroundImage: 'radial-gradient(ellipse at center,  rgba(125,185,232,0) 0%,rgba(125,185,232,0) 60%,rgba(125,185,232,1) 61%,rgba(125,185,232,1) 100%)'
    }

    var gutter = []
    _.times(this.props.rows, function () {
      gutter.push(<div style={gutterStyle}></div>)
    })

    return <div style={style} onClick={this.props.addCoin}>
      <div style={wrapperStyle}><ReactTransitionGroup>
        {coins}
      </ReactTransitionGroup></div>
      <div style={wrapperStyle}>
        {gutter}
      </div>
    </div>
  }
})