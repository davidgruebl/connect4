var _ = require('lodash')
var React = require('react')
var markdown = require('markdown').markdown

var Messages = React.createClass({
  componentWillUpdate() {
    var node = this.getDOMNode()
    node.scrollTop = node.scrollHeight
  },

  render() {
    var style = {
      overflow: 'scroll',
      maxHeight: 200,
      fontSize: '16px',
      lineHeight: '24px'
    }

    return  <div style={style}>
      {this.props.messages.map((message) => {
        return <div><em>{message.name}:</em> <span dangerouslySetInnerHTML={{__html: message.text}} /></div>
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

  handleHighlight(){

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
      text: markdown.toHTML(this.state.message)
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
    var style = {
      overflow: 'scroll',
      maxHeight: 200
    }

    return <div>
      <div>
        <input className='chat' type='text' placeholder="enter your name" onChange={this.handleNameChange} />
      </div>

      <Messages messages={this.state.messages}/>

      <form onSubmit={this.handleMessageSubmit} onFocus={this.handleHighlight}>
        <input className='chat' style={style} name='text' type='text' placeholder="type your message, markdown is supported" value={this.state.message} onChange={this.handleMesageChange}/>
        <input style={{display: 'none'}} type='submit' />
      </form>
    </div>
  }
})
