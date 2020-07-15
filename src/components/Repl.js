
import React from 'react';
// import PropTypes from 'prop-types';
import Terminal from '../react-console-emulator/Terminal';
import InterpContext from '../contexts/Interpreter';

const Repl = React.forwardRef((_, ref) => {
  const interp = React.useContext(InterpContext);
  const welcomeMessage = `Welcome to ${interp.name}! Use Ctrl+L to clear the terminal.`;
  return (
    <Terminal
      welcomeMessage={welcomeMessage}
      promptLabel=">"
      autoFocus={true}
      noDefaults={true}
      runCommand={interp.eval}
      noNewlineParsing={true}
      ref={ref}
    />
  );
});

Repl.propTypes = {
};

export default Repl;

