import React from 'react';

// Language interface:
//
//
// eval: string -> string
//  Eval takes an input string and evaluates it.
//  The returned string is considered to be the output, which is
//  to be written to the terminal. stdout/stderr should be combined.
//
// resetEval: string -> string
//  ResetEval creates a new environment and evaluates the input string in the new environment.
//  Future calls to 'eval' should use this new environment.
//
// name: string
//  The language name used in multiple locations
//
// mode: string
//  The CodeMirror language mode to use.
//  Choose something similar, or write your own.
//
// autoCloseBrackets: string
//  String containing the brackets to be closed in the editor
//  Ex. In uscheme, the single quote ' should not auto-close.

export default React.createContext({
  eval: str => console.log(`Unable to call 'eval("${str}")': Context not initialized`),
  reset: str => console.log(`Unable to call 'reset("${str}")': Context not initialized`),
  name: '<unnamed>',
  mode: '',
  autoCloseBrackets: '()[]{}'
});

// export default React.createContext({
  // eval: str => console.log(`Unable to eval("${str}"): Interpreter context not initialized`),
  // reset: str => console.log(`Unable to reset("${str}"): Interpreter context not initialized`),
  // name: '<unnamed>'
// });

