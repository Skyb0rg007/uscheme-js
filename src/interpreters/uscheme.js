
import React from 'react';

export const useUschemeInterpreter = (filemap) => {

  const [interpEval, setInterpEval] =
    React.useState(() => window.uscheme.make_interp());

  const usefn = filename => {
    if (filemap.has(filename))
      return filemap.get(filename);
    return '\0';
  };

  return {
    eval: str => interpEval([usefn, str]),
    resetEval: str => {
      const newEval = window.uscheme.make_interp();
      setInterpEval(() => newEval);
      return newEval([usefn, str]);
    },
    name: 'uscheme',
    mode: 'uscheme',
    autoCloseBrackets: '()[]{}'
  };

};

