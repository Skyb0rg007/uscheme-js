
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Editor from './view/Editor';
import FileManager from './view/FileManager';
import Repl from './view/Repl';

const Main = () => {

  const [filemap, setFilemap] = React.useState(new Map([['main.scm', ';; Enter code here\n;; Press <Ctrl+Enter> to run']]));
  const [currentFile, setCurrentFile] = React.useState('main.scm');
  const [evaluate, setEvaluate] = React.useState(() => window.uscheme.make_interp());
  const replRef = React.useRef();

  const editorVal = filemap.get(currentFile);
  const interpContext = {
    name: 'uscheme',
    autoCloseBrackets: '()[]{}',
    mode: 'scheme',
    eval: str => str,
    reset: str => str
  };

  const run = () => {
    interpContext.reset(replRef)
  };

  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Comp 105</Navbar.Brand>
        <Nav>
          <Container>
            <Nav.Link className="bg-success" href="#" onSelect={run}>Run</Nav.Link>
          </Container>
        </Nav>
      </Navbar>
      <Container>
        <InterpContext.Provider value={interpContext}>
          <Row>
            <Col md="auto">
              <FileManager usemap={usemap} onAddFile={onAddFile} onFileSelect={onFileSelect} />
            </Col>
            <Col>
              <Editor onCtrlEnter={onCtrlEnter} value={editorValue} onBeforeChange={editorOnBeforeChange} />
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

Main.propTypes = {
};

export default Main;
