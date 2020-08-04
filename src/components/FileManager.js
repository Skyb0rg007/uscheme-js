
import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { simpleDrag } from '../util';

export default ({ usemap, setUsemap, onFileSelect }) => {

  const textRef = React.useRef();
  const style = {
    position: 'relative'
  };
  React.useEffect(() => {
    simpleDrag(textRef.current, el => console.log('dragging'), null, 'horizontal');
  });

  return (
    <Container style={style} ref={textRef}>
      <p style={style}>Files</p>
      <Button
        onClick={() => setUsemap(new Map([...Array.from(usemap), [ 'asdf', '(val asdf 1)' ]]))} >
        Click Me
      </Button>
      <ListGroup>
        {
          Array.from(usemap).map(([ file, contents ], i) => {
            console.log('file: ' + file + ', contents = ' + contents)
            return (
              <ListGroup.Item
                key={i}
                action
                onClick={() => onFileSelect && onFileSelect(file)}>
              {file} : {contents}
              </ListGroup.Item>
            );
          })
        }
      </ListGroup>
    </Container>
  )

};

