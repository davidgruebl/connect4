var http = require('http')
var join = require('path').join

var debug = require('debug')('connect4:index')
var express = require('express')

var app = express()
var server = http.Server(app)
var io = require('socket.io')(server)

app.use(express.static(join(__dirname, 'public')))

var games = [[]]
var current = 0

io.on('connection', function (socket) {
  if (games[current].push(socket) < 2) return

  startGame(games[current])
  games[++current] = []
})

server.listen(5000, function () {
  debug('Listening on port %d', 5000)
})

function startGame (sockets) {
  io.to(sockets[0].id).emit('start', {
    id: 0
  })

  io.to(sockets[1].id).emit('start', {
    id: 1
  })

  sockets[0].on('addcoin', function (payload) {
    io.to(sockets[1].id).emit('addcoin', payload)
  })

  sockets[1].on('addcoin', function (payload) {
    io.to(sockets[0].id).emit('addcoin', payload)
  })

  sockets[0].on('disconnect', function () {
    io.to(sockets[1].id).emit('leave')
  })

  sockets[1].on('disconnect', function () {
    io.to(sockets[0].id).emit('leave')
  })
}