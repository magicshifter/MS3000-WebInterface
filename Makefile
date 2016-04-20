CLI=./cli.sh
BIN_DIR=node_modules/.bin/
JS_DIST_DIR=./dist/

.PHONY: \
	all \
	clean \
	compile \
	build \
	deploy \
	install \
	lint \
	lint-fix \
	cheap-concat \
	closure-compile \
	server \
	dev \
	dev-no-debug \
	flow \
	test \
	test-dev \
	inline \
	scss-lint \
	nw-build \
	help

all: dev

clean:
	@${CLI} $@

compile:
	@${CLI} $@

build:
	@${CLI} $@

deploy:
	${CLI} build

install:
	@${CLI} $@

lint:
	@${CLI} $@

lint-fix:
	@${CLI} $@

cheap-concat:
	@${CLI} $@

closure-compile:
	@${CLI} $@

server:
	@${CLI} $@

dev:
	@${CLI} $@

dev-no-debug:
	@${CLI} $@

flow:
	@${CLI} $@

test:
	@${CLI} $@

test-dev:
	@${CLI} $@

inline:
	@${CLI} $@

scss-lint:
	@${CLI} $@

nw-build:
	@${CLI} $@

help:
	@${CLI} $@
