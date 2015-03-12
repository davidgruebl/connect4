var React = require('react')

module.exports = function(winner) {
  if (winner === false) return
  React.render(
    <h1> Player {winner} won the Game! </h1>,
    document.querySelector('#info')
  )
}

