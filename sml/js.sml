
(***** SMLtoJS datatype encoding *****
 * Some of the functions here marshal data from SML to JavaScript.
 * Primitives like functions, strings, numbers, booleans are all directly translated
 * Datatypes are encoded as tagged unions using the pseudo-function 𝓔()
 *   datatype 'a t = One of int * int | Two of int | Three | Four of 'a
 *
 *   𝓔(One (a, b)) = [0, [a, b]]
 *   𝓔(Two n) = [1, n]
 *   𝓔(Three) = [2]
 *   𝓔(Four x) = [3, 𝓔(x)]
 *   𝓔(ref 2) = [2]
 *   𝓔(Vector.fromList [1, 2, 3]) = [1, 2, 3]
 *   𝓔(Array.fromList [1, 2, 3]) = [1, 2, 3]
 *   𝓔([4, 5, 6]) = [4, [5, [6, null]]]
 *   𝓔(x :: xs) = [x, xs]
 *   𝓔([]) = null
 *   𝓔({ lbl1 = val1, lbl2 = val2 }) = [val1, val2], assuming lbl1 < lbl2
 *
 * The first array element is the datatype tag.
 * The second array element is the value associated with the variant.
 *
 * Tuples, Vectors, and Arrays are encoded directly as JavaScript arrays.
 * Refs are encoded as 1-element arrays.
 * Lists are encoded as nested array-tuples, ending with null.
 *
 * Records are encoded as Vectors, with the ordering based on sorting the keys.
 *)

(* This API is unsafe. Use with care. *)
signature JS_API =
sig

  (* Executes the given string as a statement. Possibly includes arguments.
   * Be sure to include 'return' if the statement has a return value
   *)
  val exec0 : string -> 'b
  val exec1 : string * (string * 'a) -> 'b
  val exec2 : string * (string * 'a) * (string * 'b) -> 'c
  val exec3 : string * (string * 'a) * (string * 'b) * (string * 'c) -> 'd

  (* [setglobal (name, value)] sets the global variable name to value *)
  val setglobal : string * 'a -> unit

  (* Structure for dealing with JavaScript 'Map's with string keys *)
  structure StringMap :
  sig
    type 'a t
    val fromList : (string * 'a) list -> 'a t
    val toList : 'a t -> (string * 'a) list
    val empty : unit -> 'a t
    val set : 'a t * string * 'a -> unit
    val get : 'a t * string -> 'a option
  end

end

structure JsAPI :> JS_API =
struct

  fun exec0 stmt =
    prim ("execStmtJS", (stmt, ""))
  fun exec1 (stmt, (name1, val1)) =
    prim ("execStmtJS", (stmt, name1, val1))
  fun exec2 (stmt, (name1, val1), (name2, val2)) =
    prim ("execStmtJS", (stmt, name1 ^ "," ^ name2, val1, val2))
  fun exec3 (stmt, (name1, val1), (name2, val2), (name3, val3)) =
    prim ("execStmtJS", (stmt, name1 ^ "," ^ name2 ^ "," ^ name3, val1, val2, val3))

  fun setglobal (name, value) =
    exec2 ("window[name] = value", ("name", name), ("value", value))

  structure StringMap =
  struct
    type 'a t = foreignptr
    fun fromList xs =
      exec1 ("return new Map(xs)", ("xs", Vector.fromList xs))
    fun toList m =
      Vector.toList (exec1 ("return Array.from(m)", ("m", m)))
    fun empty () =
      exec0 ("return new Map()")
    fun set (m, k, v) =
      exec3 ("m.set(k, v)", ("m", m), ("k", k), ("v", v))
    fun get (m, k) =
      exec2 ("return m.has(k) ? [0, m.get(k)] : [1]", ("m", m), ("k", k))
  end

end
