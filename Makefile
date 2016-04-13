CLI=./cli.sh
BIN_DIR=node_modules/.bin/
JS_DIST_DIR=./dist/

.PHONY: \
	all \
	dev \
	sed \
	install \
	clean \
	build \
	lint \
	lint-fix \
	server \
	nw-build \
	dev-no-debug \
	test \
	test-dev \
	deploy

all: dev

clean:
	${CLI} $@

compile:
	${CLI} $@

build:
	${CLI} $@

deploy:
	${CLI} build

install:
	${CLI} $@

lint:
	${CLI} $@

lint-fix:
	${CLI} $@

cheap-concat:
	${CLI} $@

closure-compile:
	${CLI} $@

server:
	${CLI} $@

dev:
	${CLI} $@

dev-no-debug:
	${CLI} $@

flow:
	${CLI} $@

test:
	${CLI} $@

test-dev:
	${CLI} $@

inline:
	${CLI} $@

scss-lint:
	${CLI} $@

nw-build:
	${CLI} $@

help:
	${CLI} $@
