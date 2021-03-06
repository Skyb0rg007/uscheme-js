
import React from 'react';
// import PropTypes from 'prop-types';
// import InterpContext from '../contexts/Interpreter';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
// import './uscheme-mode';
import 'codemirror/mode/scheme/scheme';
import { useLocalStorage } from '../util';

const Editor = ({ valRef, onCtrlEnter }) => {
  const [value, setValue] = useLocalStorage('editor-value', ';; Enter code here!\n\n');
  React.useEffect(() => {
    valRef.current = value;
  }, [valRef, value]);
  const [instance, setInstance] = React.useState(null);
  React.useEffect(() => {
    const keyMap = {
      'Ctrl-/': cm => cm.toggleComment(),
      'Ctrl-Enter': cm => onCtrlEnter(cm)
    };
    if (instance) {
      instance.addKeyMap(keyMap);
    }
  }, [instance, onCtrlEnter]);
  const onBeforeChange = (editor, data, value) => {
    setValue(value);
  };
  const opts = {
    mode: 'scheme',
    theme: 'gruvbox-dark',
    smartIndent: true,
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: '()[]{}',
  };
  return (
    <CodeMirror
      value={value}
      onBeforeChange={onBeforeChange}
      options={opts}
      editorDidMount={editor => setInstance(editor)}
    />
  );
};

export default Editor;

