#!/bin/sh

SMLTOJS=smltojs
CLOSURE_COMPILER=google-closure-compiler

# shellcheck disable=SC1007
DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
SOURCEDIR="$DIR/sml"
OUTPUT="$DIR/public/amalg.js"

die() {
  echo >&2 "Error: $1"
  exit 1
}

log() {
  echo >&2 "$1"
}

set -e

log "Creating a temporary directory"
tempdir="$(mktemp --directory /tmp/mlbuildXXXXX)"
# shellcheck disable=SC2064
trap "rm -rf -- $tempdir" EXIT

# Move to temp dir to prevent creation of build artifacts
cd "$tempdir" || die "Could not 'cd' into '$tempdir'"

# Copy source files
cp "$SOURCEDIR"/* .

log "Compiling SML code to JavaScript"
$SMLTOJS uscheme.mlb

log "Collecting JavaScript code into a single source"
sed -n 's/.*src="\(.*\)".*/\1/p' run.html | xargs cat > amalg.js

log "Running the Google Closure Compiler"
$CLOSURE_COMPILER --jscomp_off='*' --js=amalg.js --js_output_file="$OUTPUT"


