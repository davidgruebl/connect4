require('babel/register')

var React = require('react/addons')
window.socket = require('socket.io-client')()

var Field = require('./field.jsx')

window.socket.on('start', function (game) {
  React.render(<Field {...game}/>, document.querySelector('#app'))
})

// TODO
window.socket.on('leave', console.log.bind(console))

if (window.location.pathname.length > 1) {
  window.gameid = window.location.pathname.substr(1);
  window.socket.emit('register', window.gameid)
  console.log('joined', window.gameid)
}
