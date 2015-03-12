require('babel/register')

var React = require('react/addons')
var io = require('socket.io-client')()

var Field = require('./field.jsx')

console.log('joined')

io.on('start', function (game) {
  React.render(<Field {...game}/>, document.querySelector('#app'))
})

io.on('leave', console.log.bind(console))
