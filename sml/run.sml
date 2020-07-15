
val console_log =
  JsCore.exec1
  { stmt = "console.log(value);"
  , arg1 = ("value", JsCore.string)
  , res = JsCore.unit
  }

val clone_basis : basis -> basis = List.map (fn (k, v) => (k, ref (!v)))

fun make_interp () : string -> JsCore.Object.t =
  let
    val state = ref (initialBasis, 0)
    fun eval str =
      let
        val () = (TextIO.stdOutBuf := ""; TextIO.stdErrBuf := "")
        val (basis, counter) = !state
        val xdefs = stringsxdefs ("<website>", String.fields (fn c => c = #"\n") str)
        val basis' = readEvalPrintWith eprintln (xdefs, basis, (NOT_PROMPTING, PRINTING))
        val stdout = !TextIO.stdOutBuf
        val stderr = !TextIO.stdErrBuf
        val () = (TextIO.stdOutBuf := ""; TextIO.stdErrBuf := "")
      in
        state := (basis', if stderr = "" then counter + 1 else counter);
        JsCore.Object.fromList JsCore.string [("stdout", stdout), ("stderr", stderr), ("counter", Int.toString counter)]
      end
  in
    eval
  end

val () =
  JsCore.exec1
  { stmt = "uscheme.make_interp = make_interp;"
  , arg1 = ("make_interp", JsCore.==> (JsCore.unit, JsCore.==> (JsCore.string, JsCore.fptr)))
  , res = JsCore.unit
  }
  make_interp


