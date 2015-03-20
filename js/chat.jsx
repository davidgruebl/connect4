var _ = require('lodash')
var React = require('react')

var Messages = React.createClass({
  componentWillUpdate() {
    var node = this.getDOMNode()
    node.scrollTop = node.scrollHeight
  },

  render() {
    var style = {
      overflow: 'scroll',
      maxHeight: 200
    }

    return  <div style={style}>
      {this.props.messages.map((message) => {
        return <div><em>{message.name}:</em> {message.text}</div>
      })}
    </div>
  }
})

module.exports = React.createClass({
  getInitialState() {
    return {
      name: `Player ${this.props.id}`,
      messages: []
    }
  },

  componentDidMount() {
    this.props.socket.on('chatmessage', this.addMessage)
  },

  handleNameChange(e) {
    this.setState({
      name: e.target.value.trim()
    })
  },

  handleMesageChange(e) {
    console.log(1)
    this.setState({
      message: e.target.value
    })
  },

  handleMessageSubmit(e) {
    console.log(2)

    e.preventDefault()

    var message = {
      name: this.state.name,
      text: this.state.message
    }

    this.addMessage(message)

    this.props.socket.emit('chatmessage', message)
  },

  addMessage(message) {
    var messages = _.cloneDeep(this.state.messages)

    messages.push(message)
    this.setState({messages, message: ''})
  },

  render() {
    return <div>
      <div>
        Your Name: <input type='text' value={this.state.name} onChange={this.handleNameChange} />
      </div>

      <Messages messages={this.state.messages}/>

      <form onSubmit={this.handleMessageSubmit}>
        New message:
        <input name='text' type='text' value={this.state.message} onChange={this.handleMesageChange}/>
        <input type='submit' />
      </form>
    </div>
  }
})
