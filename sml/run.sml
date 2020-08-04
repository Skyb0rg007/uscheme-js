
val console_log =
  JsCore.exec1
  { stmt = "console.log(value);"
  , arg1 = ("value", JsCore.string)
  , res = JsCore.unit
  }

(* structure JsMap :
sig
  type t
  val empty : unit -> t
  val get : t * string -> string option
  val set : t * string * string -> unit
end =
struct
  type t = foreignptr
  val empty =
    JsCore.exec0
    { stmt = "return new Map()"
    , res = JsCore.fptr
    }
  val get =
    JsCore.exec2
    (* Note: SmlToJS encodes option types like this
     * They encode ADTs as arrays with the first element as the tag
     *)
    { stmt = "return map.has(key) ? [0, map.get(key)] : [1]"
    , arg1 = ("map", JsCore.fptr)
    , arg2 = ("key", JsCore.string)
    , res = JsCore.option JsCore.string
    }
  val set =
    JsCore.exec3
    { stmt = "map.set(key, value)"
    , arg1 = ("map", JsCore.fptr)
    , arg2 = ("key", JsCore.string)
    , arg3 = ("value", JsCore.string)
    }
end *)

val clone_basis : basis -> basis = List.map (fn (k, v) => (k, ref (!v)))

fun make_interp () : (string -> string) * string -> string =
  let
    val state = ref initialBasis
    fun eval (usemap, str) =
      let
        val () = console_log ("str = " ^ str)
        val usemap = fn filename =>
          let val res = usemap filename
          in
            if Char.ord (String.sub (res, 0)) = 0
              then raise NotFound filename
              else res
            handle Subscript => ""
          end
        val () = TextIO.outputBuf := ""
        val basis = !state
        val xdefs = stringsxdefs ("<website>", String.fields (fn c => c = #"\n") str)
        val basis' = readEvalPrintWith usemap eprintln (xdefs, basis, (NOT_PROMPTING, PRINTING))
        val output = !TextIO.outputBuf
        val () = TextIO.outputBuf := ""
      in
        state := basis';
        output
      end
  in
    eval
  end

local
  infixr 0 ==> ===>
  open JsCore
  fun (a, b) ===> c = JsCore.===> (a, b, c)
in
(* Export the 'make_interp' function *)
val () =
  exec1
  { stmt = "window.uscheme.make_interp = make_interp;"
  , arg1 = ("make_interp", unit ==> (string ==> string, string) ===> string)
  , res = unit
  }
  make_interp
end


