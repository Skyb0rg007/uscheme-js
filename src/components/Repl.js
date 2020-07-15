import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'codemirror/lib/codemirror.css';
// import codemirror from 'codemirror/lib/codemirror';
import 'codemirror/theme/solarized.css';
import 'codemirror/mode/scheme/scheme.js';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/search/match-highlighter';
import { Controlled as CodeMirror } from 'react-codemirror2';
import InterpContext from '../contexts/Interpreter.js';

const codeMirrorOptions = {
  lineNumbers: true,
  mode: 'scheme',
  matchBrackets: true,
  autoCloseBrackets: '()[]{}',
  highlightSelectionMatches: {
    minChars: 2,
    trim: true,
    showToken: /[-!@#$%^&*_a-zA-Z_0-9]+/
  }
};

export default () => {
  const interp = React.useContext(InterpContext);
  const [value, setValue] = React.useState('; Code');
  const [stdout, setStdout] = React.useState('');
  const [stderr, setStderr] = React.useState('');
  const onSubmit = () => {
    const r = interp.eval(value);
    interp.reset();
    setStdout(r.stdout);
    setStderr(r.stderr);
  };
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <CodeMirror
                value={value}
                onBeforeChange={(editor, data, value) => {
                  setValue(value);
                }}
                options={codeMirrorOptions}
              />
          </Col>
          <Col>
            <Button onClick={onSubmit}>
              Run
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>STDOUT: {stdout}</p>
            <p>STDERR: {stderr}</p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

