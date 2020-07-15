
val console_log =
  JsCore.exec1
  { stmt = "console.log(value);"
  , arg1 = ("value", JsCore.string)
  , res = JsCore.unit
  }

val clone_basis : basis -> basis = List.map (fn (k, v) => (k, ref (!v)))

fun make_interp () : string -> string =
  let
    val state = ref initialBasis
    fun eval str =
      let
        val () = TextIO.outputBuf := ""
        val basis = !state
        val xdefs = stringsxdefs ("<website>", String.fields (fn c => c = #"\n") str)
        val basis' = readEvalPrintWith eprintln (xdefs, basis, (NOT_PROMPTING, PRINTING))
        val output = !TextIO.outputBuf
        val () = TextIO.outputBuf := ""
      in
        state := basis';
        output
      end
  in
    eval
  end

val () =
  JsCore.exec1
  { stmt = "window.uscheme.make_interp = make_interp;"
  , arg1 = ("make_interp", JsCore.==> (JsCore.unit, JsCore.==> (JsCore.string, JsCore.string)))
  , res = JsCore.unit
  }
  make_interp


