var React = require('react/addons')

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
    var styles = {
      position: 'absolute',
      backgroundColor: this.props.player ? 'red' : 'yellow',
      top: 0,
      left: 0,
      transform: `translateY(${this.props.top}px)`,
      transition: 'transform .5s cubic-bezier(0.85, 0, 1, 0.99)',
      borderRadius: '50%',
      width: 100,
      height: 100,
      border: '1px solid grey'
    }
    return <div style={styles} data-top={this.props.top} key={1}></div>
  }
})