import React from 'react'
import style from './style.js'
import { Socket } from 'phoenix'
import uuid from 'uuid'

export class PhoenixChatSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.closeChat = this.closeChat.bind(this)
    this.configureChannels = this.configureChannels.bind(this)
    this.state = {
      input: "",
      messages: [],
      currentRoom: ""
    }
  }

  componentDidMount() {
    if (!localStorage.phoenix_chat_uuid) {
      localStorage.phoenix_chat_uuid = uuid.v4()
    }

    this.uuid = localStorage.phoenix_chat_uuid
    this.socket = new Socket("ws://localhost:4000/socket")
    this.socket.connect({uuid: this.uuid})

    this.configureChannels(this.uuid)
  }

  handleMessageSubmit(e) {
    if (e.keyCode === 13) {
      this.channel.push('message', {
        room: localStorage.phoenix_chat_uuid,
        body: this.state.input,
        timestamp: new Date().getTime()
      })
      this.setState({ input: "" })
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }

  componentWillUnmount() {
    this.channel.leave()
    this.adminChannel.leave()
  }

  configureChannels(room) {
    this.channel = this.socket.channel(`rooms:${room}`)
    this.channel.join()
      .receive("ok", ({messages}) => {
        console.log(`Succesfully joined the ${room} chat room.`)
        this.setState({
          messages,
          currentRoom: room
        })
      })
      .receive("error", () => {
        console.log(`Unable to join the ${room} chat room.`)
      })
    this.channel.on("message", payload => {
      this.setState({
        messages: this.state.messages.concat([payload])
      })
    })

    this.adminChannel = this.socket.channel(`admin:active_users`)
    this.adminChannel.join()
      .receive("ok", () => {
        console.log(`Succesfully joined the active_users topic.`)
      })
  }

  closeChat() {
    this.props.toggleChat()
  }

  render() {
    const list = !this.state.messages
      ? null
      : this.state.messages.map(function(bubble) {
        return (
          <div
            key={ Math.random().toString(35).substr(2, 6) }
            style={ bubble.from === localStorage.phoenix_chat_uuid ? style.chatRight : style.chatLeft }>
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
            onKeyDown={ this.handleMessageSubmit }
            onChange={ this.handleChange }
            value={ this.state.input }
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
