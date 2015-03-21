var React = require('react/addons')
var _ = require('lodash')
var coinStyle = require('./coin-style')

module.exports = React.createClass({
  componentWillEnter(callback) {
    var transform = this.getDOMNode().style.transform
    this.getDOMNode().style.transform = 'translateY(0)'
    setTimeout(() => {
      this.getDOMNode().style.transform = transform
      callback()
    }, 0)
  },

  render: function() {
    var styles = _.assign(_.clone(coinStyle), {
      position: 'absolute',
      backgroundColor: this.props.player ? 'red' : 'yellow',
      top: 0,
      left: 0,
      transform: `translateY(${this.props.top}px)`,
      transition: 'transform .5s cubic-bezier(0.85, 0, 1, 0.99)'
    })

    return <div style={styles} key={1}></div>
  }
})