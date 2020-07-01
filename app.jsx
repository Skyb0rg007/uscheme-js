// The wrapper React application
// Handles UI
// Note that there exists the function 'uscheme.make_interp()' that
// returns an 'eval' function for a given interpreter.

const { Container, Jumbotron, Form, Button } = ReactBootstrap;

const InterpContext = React.createContext(null);

// TODO: refactor to make stateless
const ReplLine = ({ onSuccess }) => {
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
        <Form.Control disabled={successful} autoFocus size="lg" style={style} ref={inputRef}></Form.Control>
        { output ? (<Form.Text>{output}</Form.Text>) : null }
      </Form.Group>
    </Form>
  );
};

const Repl = () => {
  const [numLines, setNumLines] = React.useState(1);
  const onSuccess = () => setNumLines(numLines + 1);
  return (
    <React.Fragment>
      { Array.from({length: numLines}, (x, i) => (<ReplLine key={i} onSuccess={onSuccess} />))
      }
    </React.Fragment>
  );
};

const App = () => {
  const [interp, setInterp] = React.useState(() => uscheme.make_interp());
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
        <Button onClick={() => setInterp(() => uscheme.make_interp())}>
          Reset Environment
        </Button>
        <InterpContext.Provider value={interp}>
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