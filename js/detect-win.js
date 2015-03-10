var _ = require('lodash')

module.exports = function (field) {
  var rotatedField = _.zip.apply(_, field)
  var reverseField = _.clone(field).reverse()

  var verticalResults = _.map(field, check)
  var horizontalResults = _.map(rotatedField, check)
  var diagonalResults45 = _.map(getDiagonals(field), check)
  var diagonalResults135 = _.map(getDiagonals(reverseField), check)
  var results = verticalResults.concat(horizontalResults, diagonalResults45, diagonalResults135)

  var winner = _.reduce(results, function (result, player) {
    return result === false ? player : result
  }, false)

  if (winner !== false) console.log(`Player ${winner} won the Game!`)

  return false
}

function getDiagonals (field) {
  var tmp = _.cloneDeep(field)
  for (var i = 1; i < tmp.length; i++) {
    _.times(i, function () {
      tmp[i].unshift(null)
    })
  }
  return _.zip.apply(_, tmp)
}

function check (column) {
  var inital = {
    player: null,
    connected: 1
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

function printField (field) {
  field.forEach(function (row) {
    console.log(row.join(' | '))
  })
}
