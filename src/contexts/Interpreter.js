import React from 'react';

export default React.createContext({
  eval: str => console.log(`Unable to eval("${str}"): Interpreter context not initialized`),
  reset: str => console.log(`Unable to reset("${str}"): Interpreter context not initialized`),
  name: '<unnamed>'
});

