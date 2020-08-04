
# About

This project is designed to provide students at Tufts university with the
ability to access the COMP-105 course programming languages from the web.
The interface is designed after Repl.it, which allows for programming in a
nice web interface.

One issue that plagued students of COMP-105 is tooling. Setting up your editor
to syntax-highlight and auto-format the LISP code we require is something rarely done,
especially since students are not given instructions on how to install the interpreters
locally. This leads to situations where the write-test-run cycle is incredibly slow,
which makes coding assignments that much harder.

While LISP is incredibly useful for editing for experienced programmers,
newcomers that don't want to install anything are left with confusion and frustration.
For example, given an s-expression like `(+ 1 2)`, turning this into `(- x (+ 1 2))`
is incredibly simple given a good setup, often in two or three keystrokes. However,
if programming is done in Sublime without packages (as it often is), this requires
the programmer to use the mouse, or hold down the right-arrow key. Not to mention
the time spent manually formatting the s-expressions, when Vim comes with a formatter
out of the box.

Hopefully this coding environment facilitates programming in a more productive manner,
and can work alongside the online teaching environment for a more integrated learning cycle.

