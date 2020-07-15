
structure OS =
struct
  structure Process =
  struct
    fun getEnv "NOERRORLOC" = NONE
      | getEnv "BPCOPTIONS" = NONE
      | getEnv _ = NONE
  end
end

structure TextIO =
struct

  val outputBuf = ref ""

  fun stdOut x = outputBuf := !outputBuf ^ x
  fun stdErr x = outputBuf := !outputBuf ^ x

  fun output (f, x) = f x

  fun inputLine _ = raise Fail "inputLine - not supported!"
  type instream = unit
  fun openIn _ = raise Fail "openIn - not supported!"
  fun closeIn _ = raise Fail "closeIn - not supported!"
  fun stdIn _ = raise Fail "stdIn - not supported!"

end

fun print x = TextIO.output (TextIO.stdOut, x)

