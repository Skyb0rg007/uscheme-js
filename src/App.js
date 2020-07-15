
import React from 'react';
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
import Repl from './components/Repl';
import Editor from './components/Editor';
import InterpContext from './contexts/Interpreter';

export default () => {
  const [interpEval, setInterpEval] = React.useState(window.uscheme.make_interp);
  const replRef = React.useRef();
  const editorRef = React.useRef('');
  const interp = {
    eval: str => {
      const res = interpEval(str);
      res.split('\n').forEach(line => replRef.current.pushToStdout(line));
    },
    reset: str => {
      const newEval = window.uscheme.make_interp();
      setInterpEval(() => newEval);
      const res = newEval(str);
      res.split('\n').forEach(line => replRef.current.pushToStdout(line));
    },
    name: 'uscheme'
  };
  const run = () => {
    interp.reset(editorRef.current);
  }
  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Comp 105</Navbar.Brand>
        <Nav>
          <Nav.Link href="#" onSelect={run}>Run</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <InterpContext.Provider value={interp}>
          <Row>
            <Col>
              <Editor valRef={editorRef} />
            </Col>
            <Col>
              <Repl ref={replRef} />
            </Col>
          </Row>
        </InterpContext.Provider>
    </Container>
    </React.Fragment>
  );
};

