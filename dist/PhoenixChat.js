'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoenixChat = exports.PhoenixChatButton = exports.PhoenixChatSidebar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style.js');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoenixChatSidebar = exports.PhoenixChatSidebar = function (_React$Component) {
  _inherits(PhoenixChatSidebar, _React$Component);

  function PhoenixChatSidebar(props) {
    _classCallCheck(this, PhoenixChatSidebar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PhoenixChatSidebar).call(this, props));

    _this.closeChat = _this.closeChat.bind(_this);
    _this.state = {
      messages: [{ from: "Client", body: "Test" }, { from: "John", body: "Foo" }, { from: "Client", body: "Bar" }]
    };
    return _this;
  }

  _createClass(PhoenixChatSidebar, [{
    key: 'closeChat',
    value: function closeChat() {
      this.props.toggleChat();
    }
  }, {
    key: 'render',
    value: function render() {
      var list = this.state.messages.map(function (bubble) {
        return _react2.default.createElement(
          'div',
          {
            key: Math.random().toString(35).substr(2, 6),
            style: bubble.from === "Client" ? _style2.default.chatRight : _style2.default.chatLeft },
          bubble.body
        );
      });

      return _react2.default.createElement(
        'div',
        { style: _style2.default.client },
        _react2.default.createElement(
          'div',
          { style: _style2.default.header },
          'PhoenixChat',
          _react2.default.createElement(
            'div',
            { onClick: this.closeChat },
            'Close'
          )
        ),
        _react2.default.createElement(
          'div',
          { style: _style2.default.chatContainer },
          list
        ),
        _react2.default.createElement(
          'div',
          { style: _style2.default.inputContainer },
          _react2.default.createElement('input', {
            type: 'text',
            style: _style2.default.inputBox }),
          _react2.default.createElement(
            'div',
            null,
            '100% free by ',
            _react2.default.createElement(
              'a',
              { href: 'learnphoenix.io' },
              'PhoenixChat'
            )
          )
        )
      );
    }
  }]);

  return PhoenixChatSidebar;
}(_react2.default.Component);

var PhoenixChatButton = exports.PhoenixChatButton = function (_React$Component2) {
  _inherits(PhoenixChatButton, _React$Component2);

  function PhoenixChatButton(props) {
    _classCallCheck(this, PhoenixChatButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PhoenixChatButton).call(this, props));
  }

  _createClass(PhoenixChatButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          onClick: this.props.toggleChat,
          style: _style2.default.chatButton },
        _react2.default.createElement('img', {
          src: 'https://github.com/LearnPhoenix/graphics/blob/master/phoenix-chat-icon.png?raw=true',
          style: _style2.default.chatImage })
      );
    }
  }]);

  return PhoenixChatButton;
}(_react2.default.Component);

var PhoenixChat = exports.PhoenixChat = function (_React$Component3) {
  _inherits(PhoenixChat, _React$Component3);

  function PhoenixChat(props) {
    _classCallCheck(this, PhoenixChat);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(PhoenixChat).call(this, props));

    _this3.state = {
      isOpen: false
    };
    _this3.toggleChat = _this3.toggleChat.bind(_this3);
    return _this3;
  }

  _createClass(PhoenixChat, [{
    key: 'toggleChat',
    value: function toggleChat() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.state.isOpen ? _react2.default.createElement(PhoenixChatSidebar, { toggleChat: this.toggleChat }) : _react2.default.createElement(PhoenixChatButton, { toggleChat: this.toggleChat })
      );
    }
  }]);

  return PhoenixChat;
}(_react2.default.Component);

exports.default = PhoenixChat;