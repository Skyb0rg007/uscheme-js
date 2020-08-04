
// datatype 'a option = SOME of 'a | NONE
// Construction:
// SOME : 'a -> 'a option
export const SOME = x => [0, x];
// NONE : 'a option
export const NONE = [1];
// is_option : 'a -> bool
export const is_option = x => x instanceof Array
  && ((x[0] === 0 && x.length === 2) || (x[0] === 1 && x.length === 1));
// Elimination:
// option : { SOME: 'a -> 'b, NONE: unit -> 'b } -> 'a option -> 'b
export const option = ({SOME, NONE}) => opt => {
  if (!is_option(opt))
    throw new Error('smltojs.option() passed non-option');
  switch (opt[0]) {
    case 0: return SOME(opt[1]);
    case 1: return NONE();
    default: throw new Error('cannot happen');
  }
};

// datatype 'a list = 'a :: 'a list | nil
// Construction:
// CONS : 'a * 'a list -> 'a list
export const CONS = (x, xs) => [x, xs];
// NIL : 'a list
export const NIL = null;
// is_list : 'a -> bool
export const is_list = xs =>
  xs === null || (xs instanceof Array && xs.length === 2 && is_list(xs[1]));
// Elimination:
// list : { CONS: 'a * 'a list -> 'b, NIL: unit -> 'b } -> 'a list -> 'b
export const list = ({CONS, NIL}) => xs => {
  if (xs instanceof Array)
    return CONS(xs[0], xs[1]);
  if (xs === null)
    return NIL();
  throw new Error('smltojs.list() passed non-list');
};
// list_cata : { CONS: 'a * 'b -> 'b, NIL: unit -> 'b } -> 'a list -> 'b
export const list_cata = ({CONS, NIL}) => {
  const f = xs => {
    if (xs instanceof Array)
      return CONS(xs[0], f(xs[1]));
    if (xs === null)
      return NIL();
    throw new Error('smltojs.list_cata() passed non-list');
  };
  return f;
};



