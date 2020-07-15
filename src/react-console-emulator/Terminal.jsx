import React, { Component } from 'react'
import defaults from 'defaults'
import isEqual from 'react-fast-compare'

// Components
import TerminalMessage from './TerminalMessage'

// Handlers
import validateCommands from './handlers/validateCommands'
import scrollHistory from './handlers/scrollHistory'
import parseEOL from './handlers/parseEOL'

// Definitions
import sourceStyles from './defs/styles/Terminal'
import types from './defs/types/Terminal'

// Utils
import commandExists from './utils/commandExists'

export default class Terminal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stdout: [],
      history: [],
      historyPosition: null,
      previousHistoryPosition: null,
      // TODO: Add prop-controlled enable/disable on the input
      processing: false
    }

    this.terminalRoot = React.createRef()
    this.terminalInput = React.createRef()
  }

  static propTypes = types

  /* istanbul ignore next: Covered by interactivity tests */
  focusTerminal = () => {
    // Only focus the terminal if text isn't being copied
    const isTextSelected = window.getSelection().type === 'Range'
    if (!isTextSelected) this.terminalInput.current.focus()
  }

  /* istanbul ignore next: Covered by interactivity tests */
  scrollToBottom = () => {
    const rootNode = this.terminalRoot.current

    // This may look ridiculous, but it is necessary to decouple execution for just a millisecond in order to scroll all the way
    setTimeout(() => { rootNode.scrollTop = rootNode.scrollHeight }, 1)
  }

  showWelcomeMessage = () => {
    const msg = this.props.welcomeMessage
    this.pushToStdout(msg)
  }

  /**
   * @param {String} message
   * @param {Object} options {
   *  rawInput: Raw input from the terminal (For history),
   *  isEcho: For distinguishing echo messages (Exemption from message styling)
   * }
   */
  pushToStdout = (message, options) => {
    const { stdout } = this.state
    stdout.push({ message, isEcho: options?.isEcho || false })

    /* istanbul ignore next: Covered by interactivity tests */
    if (options?.rawInput) this.pushToHistory(options.rawInput)
    this.setState({ stdout: stdout })
  }

  /**
   * @param {String} rawInput Raw command input from the terminal
   */
  /* istanbul ignore next: Covered by interactivity tests */
  pushToHistory = rawInput => {
    const { history } = this.state
    history.push(rawInput)
    this.setState({ history: history, historyPosition: null })
  }

  getStdout = () => {
    // Parse EOL if it isn't disabled
    const stdout = !this.props.noNewlineParsing ? parseEOL(this.state.stdout) : this.state.stdout

    return stdout.map((line, i) => {
      return <TerminalMessage
        key={i}
        content={line.message}
        dangerMode={this.props.dangerMode}
        className={!line.isEcho ? this.props.messageClassName : /* istanbul ignore next: Covered by interactivity tests */ undefined}
        style={!line.isEcho ? this.props.messageStyle : /* istanbul ignore next: Covered by interactivity tests */ undefined}
      />
    })
  }

  /* istanbul ignore next: Covered by interactivity tests */
  clearStdout = () => {
    this.setState({ stdout: [] })
  }

  /* istanbul ignore next: Covered by interactivity tests */
  clearInput = () => {
    this.setState({ historyPosition: null })
    this.terminalInput.current.value = ''
  }

  /* istanbul ignore next: Covered by interactivity tests */
  processCommand = () => {
    this.setState({ processing: true }, () => {
      // Initialise command result object
      const rawInput = this.terminalInput.current.value

      if (!this.props.noHistory) this.pushToHistory(rawInput)

      if (!this.props.noEchoBack) {
        // Mimic native terminal by echoing command back
        // Also exempt it from message since it should not really be a message despite behaving like one
        // Containing it in a span to allow JSX values in the prompt label
        const echo = <span>{this.props.promptLabel || '$'} {rawInput}</span>
        this.pushToStdout(echo, { isEcho: true })
      }

      if (rawInput) {
        const res = this.props.runCommand(rawInput);
        if (res)
          this.pushToStdout(res);
      }

      this.setState({ processing: false }, () => {
        this.clearInput()
        if (!this.props.noAutoScroll) this.scrollToBottom()
      })
    })
  }

  /* istanbul ignore next: Covered by interactivity tests */
  scrollHistory = direction => {
    const { history, historyPosition, previousHistoryPosition } = this.state

    const toUpdate = scrollHistory(direction, {
      history,
      historyPosition,
      previousHistoryPosition,
      terminalInput: this.terminalInput
    })

    // Only update if there is something to update
    if (toUpdate) this.setState(toUpdate)
  }

  /* istanbul ignore next: Covered by interactivity tests */
  handleInput = event => {
    switch (event.key) {
      case 'Enter': this.processCommand(); break
      case 'ArrowUp': this.scrollHistory('up'); break
      case 'ArrowDown': this.scrollHistory('down'); break
      default:
        // Ctrl + L
        if (event.ctrlKey && event.keyCode === 76) {
          this.clearStdout();
          event.preventDefault();
        }
    }
  }

  // componentDidUpdate (prevProps) {
    // If there was a change in commands, re-validate
    // if (!isEqual(prevProps.commands, this.props.commands)) this.validateCommands()
  // }

  componentDidMount () {
    // this.validateCommands()
    if (this.props.welcomeMessage) this.showWelcomeMessage()
    /* istanbul ignore next: Covered by interactivity tests */
    if (this.props.autoFocus) this.focusTerminal()
  }

  render () {
    const styles = {
      container: defaults(this.props.style, sourceStyles.container),
      content: defaults(this.props.contentStyle, sourceStyles.content),
      inputArea: defaults(this.props.inputAreaStyle, sourceStyles.inputArea),
      promptLabel: defaults(this.props.promptLabelStyle, sourceStyles.promptLabel),
      input: defaults(this.props.inputStyle, sourceStyles.input)
    }

    return (
      <div
        ref={this.terminalRoot}
        name='react-console-emulator'
        className={this.props.className}
        style={styles.container}
        onClick={this.focusTerminal}
      >
        {/* Content */}
        <div
          name='react-console-emulator__content'
          className={this.props.contentClassName}
          style={styles.content}
        >
          {/* Stdout */}
          {this.getStdout()}
          {/* Input area */}
          <div
            name='react-console-emulator__inputArea'
            className={this.props.inputAreaClassName}
            style={styles.inputArea}
          >
            {/* Prompt label */}
            <span
              name='react-console-emulator__promptLabel'
              className={this.props.promptLabelClassName}
              style={styles.promptLabel}
            >
              {this.props.promptLabel || '$'}
            </span>
            {/* Input */}
            <input
              ref={this.terminalInput}
              name='react-console-emulator__input'
              className={this.props.inputClassName}
              style={styles.input}
              onKeyDown={this.handleInput}
              type='text'
              autoComplete='off'
              disabled={
                this.props.disabled ||
                (this.props.disableOnProcess && /* istanbul ignore next: Covered by interactivity tests */ this.state.processing)
              }
            />
          </div>
        </div>
      </div>
    )
  }
}
