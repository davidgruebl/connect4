var React = require('react')

module.exports = React.createClass({
  render: function() {
    var styles = {
      position: 'absolute',
      backgroundColor: 'white',
      top: 0,
      left: 0,
      borderRadius: '50%',
      width: this.props.size,
      height: this.props.size,
      transition: 'all 1s ease-in-out'
    }
    console.log(styles, this.props)
    var margin = this.props.margin

    var x = margin + (this.props.col * (this.props.size + margin))
    var y = margin + (this.props.row * (this.props.size + margin))

    styles.transform = `translateX(${x}px) translateY(${y}px)`

    return <div style={styles}></div>
  }
})