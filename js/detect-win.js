var _ = require('lodash')

module.exports = function (field) {
  var rotatedField = _.zip.apply(_, field)

  var verticalResults = _.map(field, check)
  var horizontalResults = _.map(rotatedField, check)

  var results = verticalResults.concat(horizontalResults)

  var winner = _.reduce(results, function (result, player) {
    return result === false ? player : result
  }, false)

  if (winner !== false) console.log(`Player ${winner} won the Game!`)

  function check (column) {
    var inital = {
      player: null,
      connected: 0
    }

    var result = _.reduce(column, function (result, player) {
      if (result.won) return result

      if (typeof result.player !== 'number') return {
        player,
        connected: typeof player === 'number' ? 1 : 0
      }

      if (result.player !== player) return inital

      if (++result.connected >= 4) result.won = true

      result.player = player

      return result
    }, inital)

    return result.won ? result.player : false
  }

  return false
}
