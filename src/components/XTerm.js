
import React from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const XTerm = ({ prompt = '\r\n$ ' }) => {

  const termRef = React.useRef();
  const divRef = React.useRef();

  React.useEffect(() => {
    const term = new Terminal();
    termRef.current = term;
    term.open(divRef.current);
    term.onKey(e => {
      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        termRef.current.prompt();
      } else if (ev.keyCode === 8) {
        if (termRef.current._core.buffer.x > 2) {
          termRef.current.write('\b \b');
        }
      } else if (printable) {
        termRef.current.write(e.key);
      }
    });
    return term.dispose;
  }, []);

  React.useEffect(() => {
    termRef.current.prompt = () => termRef.current.write(prompt);
  }, [termRef, prompt])

  React.useEffect(() => {
    termRef.current.prompt();
  }, [])

  // React.useEffect(() => {
    // const term = new Terminal();
    // term.open(divRef.current);
    // termRef.current = new Terminal();
    // termRef.current.open(divRef.current);
    // termRef.current.prompt = () => {
      // termRef.current.write('\r\n$ ');
    // };
    // termRef.current.writeln('Welcome');
    // termRef.current.onKey(e => {
      // const ev = e.domEvent;
      // const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      // if (ev.keyCode === 13) {
        // termRef.current.prompt();
      // } else if (ev.keyCode === 8) {
        // if (termRef.current._core.buffer.x > 2) {
          // termRef.current.write('\b \b');
        // }
      // } else if (printable) {
        // termRef.current.write(e.key);
      // }
    // });

    // return () => term.dispose();
  // });

  return (
    <div ref={divRef}></div>
  );

};
export default XTerm;

