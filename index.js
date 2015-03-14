var http = require('http')
var path = require('path')
var url = require('url')
var debug = require('debug')('connect4:index')
var express = require('express')

var app = express()
var server = http.Server(app)
var io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

var games = {}

server.listen(5000, function (request, response) {
  debug('Listening on port %d', 5000)
  debug(request)
})

app.get('*', function(req, res) {
  var gameid = url.parse(req.url, true).path
  debug(gameid)

  games[gameid] = games[gameid] || []

  io.on('connection', function (socket) {
    var playercount = games[gameid].push(socket)
    if (playercount !== 2) return io.to(socket.id).emit(playercount > 2 ? 'full' : 'wait', playercount)

    startGame(games[gameid])
  })

  res.sendFile(path.join(__dirname, 'public', 'index.html'))
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