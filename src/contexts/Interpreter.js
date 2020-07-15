import React from 'react';

export default React.createContext({
  eval: str => console.log(`Unable to eval("${str}"): Interpreter context not initialized`),
  reset: () => console.log(`Unable to reset(): Interpreter context not initialized`)
});

