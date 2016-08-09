import React from 'react'
import style from './style.js'

export class PhoenixChatSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.closeChat = this.closeChat.bind(this)
    this.state = {
      messages: [
        {from: "Client", body: "Test"},
        {from: "John", body: "Foo"},
        {from: "Client", body: "Bar"}
      ]
    }
  }

  closeChat() {
    this.props.toggleChat()
  }

  render() {
    const list = this.state.messages.map(function(bubble) {
      return (
        <div
          key={ Math.random().toString(35).substr(2, 6) }
          style={ bubble.from === "Client" ? style.chatRight : style.chatLeft }>
          { bubble.body }
        </div>
      )
    })

    return (
      <div style={ style.client }>
        <div style={ style.header }>
          PhoenixChat
          <div onClick={ this.closeChat }>
            Close
          </div>
        </div>

        <div style={ style.chatContainer }>
          { list }
        </div>

        <div style={ style.inputContainer }>
          <input
            type="text"
            style={ style.inputBox } />
          <div>
            100% free by <a href="learnphoenix.io">PhoenixChat</a>
          </div>
        </div>
      </div>
    )
  }
}

export class PhoenixChatButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        onClick={ this.props.toggleChat }
        style={ style.chatButton }>
        <img
          src="https://github.com/LearnPhoenix/graphics/blob/master/phoenix-chat-icon.png?raw=true"
          style={ style.chatImage } />
      </div>
    )
  }
}

export class PhoenixChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.toggleChat = this.toggleChat.bind(this)
  }

  toggleChat() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <div>
        { this.state.isOpen
          ? <PhoenixChatSidebar toggleChat={this.toggleChat} />
          : <PhoenixChatButton toggleChat={this.toggleChat} /> }
      </div>
    )
  }
}

export default PhoenixChat
