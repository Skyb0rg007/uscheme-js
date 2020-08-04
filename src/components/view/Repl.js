import React from 'react';
import Terminal from '../../react-console-emulator/Terminal';
import InterpContext from '../../contexts/Interpreter';

// Creates the repl
// Uses InterpContext.eval to evaluate messages
// Use the ref.pushToStdout method to asynchronously add to the output
const Repl = React.forwardRef((_props, ref) => {
  const interp = React.useContext(InterpContext);
  const terminalRef = React.useRef();
  React.useImperativeHandle(ref, () => ({
    pushToStdout: str => {
      str.split('\n').forEach(terminalRef.current.pushToStdout);
    },
    clearStdout: terminalRef.current.clearStdout
  }));

  const welcome = `
    Welcome to ${interp.name}!
    Use Ctrl+L to clear the terminal screen
  `;

  return (
    <Terminal
      welcomeMessage={welcome}
      promptLabel=">"
      autoFocus={true}
      noDefaults={true}
      runCommand={interp.eval}
      noNewlineParsing={true}
      ref={terminalRef}
    />
  );
});

Repl.propTypes = {
};

export default Repl;

