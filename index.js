var http = require('http')
var path = require('path')
var debug = require('debug')('connect4:index')
var express = require('express')

var app = express()
var server = http.Server(app)
var io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

var games = {}

server.listen(5000, function () {
  debug('Listening on port %d', 5000)
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

io.on('connection', function (socket) {
  socket.on('register', function (cid) {
    games[cid] = games[cid] || {
      state: 'wait',
      players: []
    }
    if (games[cid].state === 'wait') {
      games[cid].players.push(socket)
      if (games[cid].players.length === 2) {
        games[cid].state = 'full'
        return startGame(cid)
      }
    }
  })
})

function pipeEvent (gameid, from, to, fromevent, toevent, hook) {
  if (typeof hook !== 'function') {
    hook = function (cb) {
      cb.apply(null, Array.prototype.slice.call(arguments, 1))
    }
  }

  games[gameid].players[from].on(fromevent,
    hook
    .bind(null, games[gameid].players[to].emit
      .bind(games[gameid].players[to], toevent || fromevent))
  )
}

function startGame (cid) {
  debug('new game', cid)
  games[cid].players.forEach(function (s, i) {
    s.emit('start', {
      id: i
    })
  })

  function disconnectHook (cb) {
    games[cid].players.forEach(function (s) {
      s.removeAllListeners('addcoin')
      s.removeAllListeners('disconnect')
    })
    delete games[cid]
    cb()
  }

  pipeEvent(cid, 0, 1, 'addcoin')
  pipeEvent(cid, 1, 0, 'addcoin')
  pipeEvent(cid, 0, 1, 'disconnect', 'leave', disconnectHook)
  pipeEvent(cid, 1, 0, 'disconnect', 'leave', disconnectHook)
}
