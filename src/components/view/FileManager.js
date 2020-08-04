
import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

const FileManager = ({ usemap, onAddFile, onFileSelect }) => {
  const [invalid, setInvalid] = React.useState(false);
  const formRef = React.useRef(null);
  const formSubmit = e => {
    e.preventDefault();
    const filename = formRef.current.value;
    if (filename === '')
      return;
    if (usemap.has(filename)) {
      setInvalid(true);
      return;
    };
    onAddFile(filename);
  };
  return (
    <Container>
      <Row>
        <p>Files</p>
      </Row>
      <Row>
        <Form onSubmit={formSubmit}>
          <Form.Row>
            <Col>
              <Form.Control
                ref={formRef}
                type="text"
                placeholder="Enter filename"
                isInvalid={invalid}
              />
            </Col>
            <Col>
              <Button onClick={formSubmit}>
                <FontAwesomeIcon icon={faFolderPlus} />
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Row>
      <Row>
        <ListGroup>
          {Array.from(usemap).map(([file, _contents], i) => (
            <ListGroup.Item key={i} action onClick={() => onFileSelect && onFileSelect(file)}>
              {file}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
};

FileManager.propTypes = {
  usemap: PropTypes.instanceOf(Map).isRequired,
  onAddFile: PropTypes.func.isRequired,
  onFileSelect: PropTypes.func
};

export default FileManager;

