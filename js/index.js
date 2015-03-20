require('babel/register')

var React = require('react/addons')
var socket = require('socket.io-client')()

var Field = require('./field.jsx')

socket.on('start', function (game) {
  React.render(<Field {...game} socket={socket}/>, document.querySelector('#app'))
})

// TODO
socket.on('leave', console.log.bind(console))

if (location.pathname.length > 1) {
  var gameid = location.pathname.substr(1);
  socket.emit('register', gameid)
  console.log('joined', gameid)
}
