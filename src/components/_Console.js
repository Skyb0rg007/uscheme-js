
import React from 'react';
import PropTypes from 'prop-types';

const Console = ({ welcomeMessage, history, prompt, onAddHistory, runCommand, autoFocus = false }) => {

  /// Hooks
  const inputRef = React.useRef(null);
  const wrapperRef = React.useRef(null);
  const reverseStringRef = React.useRef(null);
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState(() => welcomeMessage ? [welcomeMessage] : []);
  const [cmdInProgress, setCmdInProgress] = React.useState(false);
  const [reverseSearchString, setReverseSearchString] = React.useState(null);
  const [historyPosition, setHistoryPosition] = React.useState(() => history ? history.length : Infinity);
  const [reverseSearchPos, setReverseSearchPos] = React.useState(Infinity);

  /// Styles
  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'monospace',
    fontSize: '12px',
    padding: '10px',
    height: '300px'
  };
  const lineStyle = {
    fontSize: '12px',
    lineHeight: '12px',
    fontFamily: 'monospace',
    background: 'transparent',
    padding: 0,
    color: 'white'
  };
  const promptWrapperStyle = {
    display: 'flex'
  };
  const promptStyle = {
    display: 'flex',
    alignItems: 'center'
  };
  const inputStyle = {
    flex: '1',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'white',
    fontFamily: 'monospace',
    fontSize: '13px'
  };

  /// Helper Functions
  // clear : unit -> unit
  const clear = () => {
    setOutput([]);
    setInput('');
  };
  // scrollToBottom : unit -> unit
  const scrollToBottom = () => {
    inputRef.current.scrollTop = inputRef.current.scrollHeight;
  };
  // getReverseHistory : unit -> bool list
  const getReverseHistory = () => {
    if (!history)
      return [];
    return history.map(entry =>
      (reverseSearchString === null || reverseSearchString === '')
      ? false
      : entry.indexOf(reverseSearchString) !== -1);
  };
  // getCurrentTextSnapshot : unit -> string
  const getCurrentTextSnapshot = () => {
    return `${prompt}\xa0${input}`;
  };
  // addHistoryEntry : string -> unit
  const addHistoryEntry = str => {
    if (onAddHistory !== null)
      onAddHistory(str);
    setHistoryPosition(Infinity);
  };
  // focusConsole : unit -> unit
  const focusConsole = () => {
    if (inputRef.current)
      if (document.getSelection().isCollapsed)
        inputRef.current.focus();
  };
  // isReverseSearchOn : unit -> bool
  const isReverseSearchOn = () => {
    return reverseSearchString !== null;
  };
  // setPreviewPosition : int -> unit
  const setPreviewPosition = pos => {
    if (history === null)
      return;
    setHistoryPosition(pos);
    setInput(history[pos] || '');
  };

  // onSubmit : event -> unit
  const onSubmit = async e => {
    e.preventDefault();

    const log = getCurrentTextSnapshot();

    // Empty command
    if (input === '') {
      setOutput([...output, log]);
      setInput('');
      scrollToBottom();
      return;
    }

    addHistoryEntry(input);
    setCmdInProgress(true);

    const ret = await runCommand(input);
    setOutput([...output, log, ret]);
    setCmdInProgress(false);
    setInput('');
    wrapperRef.current.focus();
    scrollToBottom();
  };
  // onInputChange : event -> unit
  const onInputChange = e => {
    setInput(e.target.value);
  };
  const onReverseSearch = () => {

  };
  // onKeyDown : event -> unit
  const onKeyDown = e => {
    switch (e.which) {
      case 38: // key up
        {
          if (history === null) return;
          const currentPos = Math.min(historyPosition, history.length);
          const historyPos = Math.max(0, currentPos - 1)
          setPreviewPosition(historyPos);
          e.preventDefault();
          break;
        }
      case 40: // key down
        {
          if (history === null) return;
          const historyPos = Math.min(history.length, historyPosition + 1);
          setPreviewPosition(historyPos);
          e.preventDefault();
          break;
        }
      case 82: // Ctrl + r
        {
          if (!e.ctrlKey) return;
          if (history === null) return;
          onReverseSearch();
          e.preventDefault();
          break;
        }
      default:
        break;
    }
  };
  const onReverseSearchSubmit = () => {

  };
  const onReverseKeyDown = () => {

  };
  const onReverseStringInputChange = () => {

  };

  return (
    <div onClick={focusConsole} ref={wrapperRef} style={wrapperStyle}>
      <div>
        {output.map((line, key) =>
          <pre
            key={key}
            style={lineStyle}
            dangerouslySetInnerHTML={{__html: line}}
          />
        )}
      </div>
      <form onSubmit={onSubmit}>
        <div style={promptWrapperStyle}>
          <span style={promptStyle}>{prompt}&nbsp;</span>
          <input
            disabled={cmdInProgress || isReverseSearchOn()}
            ref={inputRef}
            autoFocus={autoFocus}
            value={input}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            autoComplete={'off'}
            spellcheck={false}
            autoCapitalize={'false'}
            name="input"
            style={inputStyle}
          />
        </div>
      </form>
      {
        isReverseSearchOn() &&
          <form onSubmit={onReverseSearchSubmit}>
            bck-i-search:
            <input
              value={reverseSearchString}
              ref={reverseStringRef}
              onKeyDown={onReverseKeyDown}
              onChange={onReverseStringInputChange}
            />
          </form>
      }
    </div>
  )

};

Console.propTypes = {
  welcomeMessage: PropTypes.string,
  history: PropTypes.arrayOf(PropTypes.string),
  prompt: PropTypes.string.isRequired,
  onAddHistory: PropTypes.func,
  runCommand: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool
};

export default Console

