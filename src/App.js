import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import Repl from './components/Repl';
import InterpContext from './contexts/Interpreter.js';
import Console from './components/Console';

export default () => {
  const [interpEval, setInterpEval] = React.useState(() => window.uscheme.make_interp());
  const interp = {
    eval: str => {
      console.log(`Evaluating ${str}...`);
      return interpEval(str);
    },
    reset: () => setInterpEval(() => window.uscheme.make_interp())
  };
  return (
    <React.Fragment>
      <Jumbotron>
        Hello!
      </Jumbotron>
      <Container>
        <InterpContext.Provider value={interp}>
          <Console
            welcomeMessage="Welcome"
            history={null}
            prompt=">"
            runCommand={cmd => console.log(`cmd = ${cmd}`)}
            autoFocus={true}
            onAddHistory={null}
          />
        </InterpContext.Provider>
    </Container>
    </React.Fragment>
  );
};

