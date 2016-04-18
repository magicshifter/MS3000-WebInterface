#!/usr/bin/env bash

BIN_DIR=node_modules/.bin
JS_DIST_DIR=./dist

function clean() {
  echo 'clean dist directory'
  rm -rf dist;
  echo "cleaned dist dir"
}

function compile() {
  echo "start compilation process"

  node -r dotenv/config --harmony bin/compile

  echo "build completed in dist/"
}

function build() {
  export NODE_ENV=production \
  && clean \
  && compile \
  && cheap-concat \
  && inline

  echo "build finished"
}

function install() {
  echo "start install using npm"

  npm install

  echo "install completed"
}

function lint() {
  echo "start lint task"

  $BIN_DIR/eslint . ./

  echo "lint completed"
}

function lint-fix() {
  echo "start lint and fix task"

  $BIN_DIR/eslint  --fix . ./

  echo "lint-fix completed"
}

function cheap-concat() {
  cat $JS_DIST_DIR/vendor.js $JS_DIST_DIR/app.js >> $JS_DIST_DIR/index.js
}

# run google closure library through java
function closure-compile() {
  echo "start closure compilation"

  mkdir -p $JS_DIST_DIR/bundled
  java \
    -jar node_modules/google-closure-compiler/compiler.jar \
    --language_in ECMASCRIPT5 \
    --compilation_level ADVANCED_OPTIMIZATIONS \
    --js $JS_DIST_DIR/vendor.js $JS_DIST_DIR/app.js\
    > $JS_DIST_DIR/index.js

  echo "closure compilation completed"
}

function server() {
  echo "start node koa development server"

  node -r dotenv/config bin/server --hot
}

function dev() {
  echo "spawn debug environment"

  $BIN_DIR/nodemon -r dotenv/config bin/server --hot
}

# start dev mode with production environment
function dev-no-debug() {
  $BIN_DIR/nodemon -r dotenv/config bin/server --hot --no_debug
}

function flow() {
  $BIN_DIR/flow ./src/
}

function test() {
  echo 'start tests'

  node -r dotenv/config ./node_modules/karma/bin/karma start bin/karma.js

  echo 'tests finished'
}

function test-dev() {
  node -r dotenv/config ./node_modules/karma/bin/karma start bin/karma.js --watch
}

function inline() {
  echo "start inlining js/css/images"

  mkdir -p $JS_DIST_DIR/bundled/
  $BIN_DIR/html-inline \
    -i $JS_DIST_DIR/min.html \
    -o $JS_DIST_DIR/bundled/index.html \
    -b $JS_DIST_DIR/ \
    --ignore-scripts

  cp $JS_DIST_DIR/index.js $JS_DIST_DIR/bundled/index.js
  cp $JS_DIST_DIR/magicshifter.appcache $JS_DIST_DIR/bundled/magicshifter.appcache
  cp $JS_DIST_DIR/favicon.ico $JS_DIST_DIR/bundled/favicon.ico
  cp $JS_DIST_DIR/app.css $JS_DIST_DIR/bundled/app.css

  gzip --keep --force --best dist/bundled/index.js

  echo "inlining finished"
}

function scss-lint() {
  $BIN_DIR/scss-lint src
}

function nw-build() {
  cp dist/package.json dist/bundled
  $BIN_DIR/nwbuild -p win64 -o ./nw dist/bundled/
  #win32,win64,osx32,osx64,linux32,linux64
}

function help() {
  echo "
make [task]

running make without task starts the dev env

dev          - start dev env
install      - install node dependencies
clean        - remove dist/
build        - compile sources to dist dir
lint         - lint code using eslint
lint-fix     - lint and fix code
server       - run server only, no build chain
dev-no-debug - start dev env in production mode
test         - run tests
test-dev     - run and watch tests
deploy       - test, clean then build
"
}

if [ $1 ]
then
  function=$1
  shift
  $function $@
else
  help $@
fi
