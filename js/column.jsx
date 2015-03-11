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

    var height = this.props.rows * 100

    var coins = _.map(this.props.filled, function (val, idx) {
      var top = height - ((idx + 1) * 100)
      return <Coin top={top} player={val} key={idx}/>
    })

    return <div style={style} onClick={this.props.addCoin}>
      <ReactTransitionGroup>
        {coins}
      </ReactTransitionGroup>
    </div>
  }
})