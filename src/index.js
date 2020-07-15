import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// let counter = 0;
// window.uscheme = {
    // make_interp: () => {
        // const state = counter++;
        // return str => {
            // const ok = Math.random() > 0.5;
            // console.log(`Evaluating "${str}" in interp ${state} to get ${ok ? 'ok' : 'error'}`);
            // return {
                // stdout: ok ? 'Evaluated!' : '',
                // stderr: !ok ? 'Error' : ''
            // }
        // }
    // }
// };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

