var React = require('react')
var _ = require('lodash')

var coinStyle = require('./coin-style.js')

module.exports = React.createClass({
  render: function () {
    var styles = _.assign(_.clone(coinStyle), {
      position: 'absolute',
      backgroundColor: this.props.player ? 'red' : 'yellow',
      bottom: '0'
    })
    if (this.props.next === this.props.player) styles.WebkitAnimation = 'bounce 600ms infinite ease-in'

    return <div style={styles}></div>
  }
})
