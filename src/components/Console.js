
import React from 'react';
import PropTypes from 'prop-types';

const terminalStyle = {
  container: {
    minHeight: '300px',
    maxWidth: '100%', // Fill parent before overflowing
    maxHeight: '100%', // Fill parent before overflowing
    borderRadius: '5px',
    overflow: 'auto',
    cursor: 'text',
    backgroundColor: '#212121',
    backgroundSize: 'cover'
  },
  content: {
    padding: '20px',
    height: '100%',
    fontSize: '15px',
    color: '#FFFFFF',
    fontFamily: 'monospace'
  },
  inputArea: {
    display: 'inline-flex',
    width: '100%'
  },
  promptLabel: {
    paddingTop: '3px',
    color: '#EE9C34'
  },
  input: {
    border: '0',
    padding: '0 0 0 7px',
    margin: '0',
    flexGrow: '100',
    width: '100%',
    height: '22px',
    background: 'transparent',
    fontSize: '15px',
    color: '#F0BF81',
    fontFamily: 'monospace',
    outline: 'none' // Fix for outline showing up on some browsers
  }
};

const terminalMessageStyle = {
    lineHeight: '21px'
};

const sendCursorToEnd = inputElem => {
  if (inputElem) {
    const cursorStart = inputElem.selectionStart;
    const cursorEnd = inputElem.selectionEnd;
    setTimeout(() => inputElem.setSelectionRange(cursorStart, cursorEnd), 10);
  }
};

const TerminalMessage = ({ content }) => {
  return (
    <div style={terminalMessageStyle}>
      {content}
    </div>
  );
};

const Terminal = ({ welcomeMessage }) => {

  const [stdout, setStdout] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  const [historyPos, setHistoryPos] = React.useState(null);
  const [prevHistoryPos, setPrevHistoryPos] = React.useState(null);
  const [processing, setProcessing] = React.useState(false);
  const terminalRoot = React.useRef();
  const terminalInput = React.useRef();

  const focusTerminal = () => {
    if (window.getSelection().type !== 'Range')
      terminalInput.current.focus();
  };
  const clearStdout = () => {
    setStdout([]);
  };
  const clearInput = () => {
    setHistoryPos(null);
    terminalInput.current.value = '';
  };
  const scrollToBottom = () => {
    const root = terminalRoot.current;
    setTimeout(() => root.scrollTop = root.scrollHeight, 1);
  };
  const pushToHistory = rawInput => {
    setHistory([...history, rawInput]);
    setHistoryPos(null);
  };
  const pushToStdout = (msg, opts) => {
    setStdout([...stdout, { message: msg, isEcho: opts?.isEcho || false }]);
    if (opts?.rawInput)
      pushToHistory(opts.rawInput);
  };
  const showWelcome = () => {

  };

};

export default Terminal;

