var React = require('react')

module.exports = React.createClass({
  render: function() {
    var styles = {
      position: 'absolute',
      backgroundColor: this.props.player ? 'red' : 'yellow',
      top: 0,
      left: 0,
      borderRadius: '50%',
      width: 100,
      height: 100,
      transition: 'all 1s ease-in-out'
    }

    styles.transform = `translateY(${this.props.top}px)`

    return <div style={styles}></div>
  }
})