// vim: set ts=2 sw=2:
// The wrapper React application
// Handles UI
// Note that there exists the function 'uscheme.make_interp()' that
// returns an 'eval' function for a given interpreter.

const { Container, Row, Col, Jumbotron, Form, Button } = ReactBootstrap;

const InterpContext = React.createContext({ eval: null, reset: null });

const ReplLine = ({ disabled, stdOutput, stdError, onSubmit }) => {
  const inputRef = React.useRef("");
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(inputRef.current.value);
  };
  const styleControl = { resize: 'both' };
  const styleError = { color: 'red' };

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
                as="textarea"
                disabled={disabled}
                autoFocus
                size="lg"
                style={styleControl}
                ref={inputRef} />
            {
              stdOutput ? (<Form.Text>{stdOutput}</Form.Text>) : null
            }
            {
              stdError ? (<Form.Text style={styleError}>{stdError}</Form.Text>) : null
            }
            <Button disabled={disabled} type="submit" variant="outline-primary">Run</Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

// TODO: refactor to make stateless
/* const ReplLine = ({ onSuccess }) => {
  const inputRef = React.useRef("");
  const interp = React.useContext(InterpContext);
  const [output, setOutput] = React.useState(null);
  const [successful, setSuccessful] = React.useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    if (inputRef.current.value === "")
      return;
    const { stdout, stderr, counter } = interp(inputRef.current.value);
    if (stderr !== "") {
      setOutput(`[${counter}]: ${stdout}\n\nERROR: ${stderr}`);
    } else {
      setOutput(`[${counter}]: ${stdout}`);
      onSuccess();
      setSuccessful(true);
    }
  };
  const style = {
    width: "100%"
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control as="textarea" disabled={successful} autoFocus size="lg" style={style} ref={inputRef}></Form.Control>
        { output ? (<Form.Text>{output}</Form.Text>) : null }
        <Button type="submit">Run</Button>
      </Form.Group>
    </Form>
  );
}; */

const Repl = () => {
  const [lines, setLines] = React.useState([{ disabled: false }]);
  const interp = React.useContext(InterpContext);
  const onSubmit = index => value => {
    console.log(`Submitting with value = "${value}", index = ${index}`);
    setLines(lines.concat([{ disabled: false }]));
    return true;
  };
  const reset = () => {
    interp.reset();
    setLines();
  };
  return (
    <React.Fragment>
      <Button onClick={reset}>Reset environment</Button>
      { lines.map(({ stdOutput, stdError }, i) =>
        (<ReplLine
            key={i}
            onSubmit={onSubmit(i)}
            stdOutput={stdOutput}
            stdError={stdError} />))
      }
    </React.Fragment>
  );
};

const App = () => {
  const [interp, setInterp] = React.useState(() => uscheme.make_interp());
  const context = {
    eval: interp,
    reset: fn () => setInterp(uscheme.make_interp())
  };
  return (
    <React.Fragment>
      <Container>
        <Jumbotron>
          <h1 className="header">
            Welcome!
          </h1>
          <p>
            Type some uscheme code into the text boxes below!
          </p>
        </Jumbotron>
        <InterpContext.Provider value={context}>
          <Repl />
        </InterpContext.Provider>
      </Container>
    </React.Fragment>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
