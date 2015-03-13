var React = require('react')

module.exports = React.createClass({
  render: function () {
    var winner = this.props.winner
    var curr = this.props.curr
    var next = this.props.next

    if (winner !== false) return <h1> You {winner === curr ? 'won ;)' : 'lost :/'} </h1>

    return <h1> It is {curr === next ? 'your' : 'their'} turn! </h1>
  }
})
