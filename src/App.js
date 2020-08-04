
import React from 'react';
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
// import Repl from './components/Repl';
// import Editor from './components/Editor';
import InterpContext from './contexts/Interpreter';
// import FileManager from './components/FileManager';
// import { useLocalStorage } from './util';

import Repl from './components/view/Repl';
import Editor from './components/view/Editor';
import FileManager from './components/view/FileManager';
import { useUschemeInterpreter } from './interpreters/uscheme';

const initialFile = `
;; main.scm
;;
;; Quick Tutorial:
;;   Enter code here
;;   Hit Ctrl+Enter to run current file
;;   Add files/switch between files on the left
;;   Running a file resets the environment,
;;     to use multiple files use 'use'
;;   Save your work! The 'main.scm' file does NOT persist!
;;   Have fun and don't cause infinite 'use' loops!
`;

const storageItem = 'usemap1';

export default () => {
  const [usemap, setUsemap] = React.useState(() => {
    let m = window.localStorage.getItem(storageItem);
    console.log(`m = ${m}`)
    if (m)
      m = new Map(Object.entries(JSON.parse(m)));
    else
      m = new Map();
    console.log(`m = ${m}`)
    const urlParams = new URLSearchParams(window.location.search);
    const content = urlParams.get('initialContent');
    return new Map([...m, ['main.scm', content || initialFile]]);
  });
  React.useEffect(() => {
    window.localStorage.setItem(storageItem, JSON.stringify(Object.fromEntries(usemap.entries())));
  }, [usemap]);
  React.useEffect(() => {
    window.clearFiles = () => setUsemap(new Map());
    window.deleteFile = filename => {
      const m = new Map(usemap);
      m.delete(filename);
      setUsemap(m);
    };
  }, [usemap, setUsemap]);

  const replRef = React.useRef(null);
  const [currentFile, setCurrentFile] = React.useState('main.scm');

  const value = usemap.get(currentFile);
  const setValue = x => setUsemap((new Map(usemap)).set(currentFile, x));;
  const interp = useUschemeInterpreter(usemap);
  const run = () =>
    replRef.current && replRef.current.pushToStdout(interp.resetEval(value));

  const onAddFile = filename => {
    setUsemap((new Map(usemap)).set(filename, `;; ${filename}\n;; Enter code here`));
  };
  // React.useEffect(() => {
    // setTimeout(() => replRef.current && replRef.current.pushToStdout('Hello'), 1000);
    // setTimeout(() => replRef.current && replRef.current.pushToStdout('Hello'), 2000);
    // setTimeout(() => replRef.current && replRef.current.pushToStdout('Hello'), 3000);
  // }, []);
  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Comp 105</Navbar.Brand>
        <Nav>
          <Container>
          </Container>
        </Nav>
      </Navbar>
        <Row>
          <Col xs={2}>
            <FileManager
              usemap={usemap}
              onAddFile={onAddFile}
              onFileSelect={setCurrentFile}
            />
          </Col>
          <Col>
            <Container>
              <InterpContext.Provider value={interp}>
                <Row>
                  <Col>
                    <Editor value={value} onEdit={setValue} onCtrlEnter={run} />
                  </Col>
                  <Col>
                    <Repl ref={replRef} />
                  </Col>
                </Row>
              </InterpContext.Provider>
            </Container>
          </Col>
        </Row>
    </React.Fragment>
  );
};


/* export default () => {
  const [interpEval, setInterpEval] = React.useState(window.uscheme.make_interp);
  // const [usemap, setUsemap] = useLocalStorage('usemap', () => new Map([['main.scm', ';; Main.scm']]));
  const [usemap, setUsemap] = React.useState(() => new Map([['main.scm', ';; Main.scm']]));
  const usemapFun = filename => {
    if (usemap.has(filename)) {
      return usemap.get(filename);
    } else {
      return '\0';
    }
  }
  const replRef = React.useRef();
  const editorRef = React.useRef('');
  const interp = {
    eval: str => {
      const res = interpEval([usemapFun, str]);
      res.split('\n').forEach(replRef.current.pushToStdout);
    },
    reset: str => {
      const newEval = window.uscheme.make_interp();
      setInterpEval(() => newEval);
      const res = newEval([usemapFun, str]);
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
          <Container>
            <Nav.Link className="bg-success" href="#" onSelect={run}>Run</Nav.Link>
          </Container>
        </Nav>
      </Navbar>
      <Container>
        <InterpContext.Provider value={interp}>
          <Row>
            <Col md="auto">
              <FileManager usemap={usemap} setUsemap={setUsemap} />
            </Col>
            <Col>
              <Editor valRef={editorRef} onCtrlEnter={run} />
            </Col>
            <Col>
              <Repl ref={replRef} />
            </Col>
          </Row>
        </InterpContext.Provider>
      </Container>
    </React.Fragment>
  );
}; */

