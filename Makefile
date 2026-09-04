NODE ?= node
LATEXMK ?= latexmk
CARGO ?= cargo

MEANING_MODEL_ROOT ?= ../meaning-model
BUILD_DIR := $(CURDIR)/build
OUTPUT_DIR := $(CURDIR)/output/pdf

.PHONY: all install install-runtime build build-rust test test-paper test-release test-runtime test-rust test-mcp verify-sources verify-runtime-sources paper release release-export release-check clean

all: test

install:
	$(NODE) -e 'if (Number(process.versions.node.split(".")[0]) < 22) { throw new Error("Node.js 22 or newer is required"); } console.log("Node.js ready; paper checks have no package dependencies.");'

install-runtime:
	cd "$(MEANING_MODEL_ROOT)/mcp-server" && npm ci

build: paper

build-rust:
	$(CARGO) build --manifest-path "$(MEANING_MODEL_ROOT)/rust-engine/Cargo.toml" --release

test: test-paper test-release verify-sources

test-runtime: test-rust test-mcp verify-runtime-sources

test-rust:
	$(CARGO) test --manifest-path "$(MEANING_MODEL_ROOT)/rust-engine/Cargo.toml"

test-mcp: build-rust
	cd "$(MEANING_MODEL_ROOT)/mcp-server" && npm test

test-paper:
	$(NODE) --test paper/lifesim-structure.test.mjs

test-release:
	$(NODE) --test scripts/export-release.test.mjs

verify-sources:
	$(NODE) scripts/verify-vendored-sources.mjs

verify-runtime-sources:
	MEANING_MODEL_ROOT="$(MEANING_MODEL_ROOT)" $(NODE) scripts/verify-vendored-sources.mjs --runtime

paper:
	mkdir -p "$(BUILD_DIR)" "$(OUTPUT_DIR)"
	$(LATEXMK) -cd -pdf -interaction=nonstopmode -halt-on-error \
		-output-directory="$(BUILD_DIR)" paper/life-simulation.tex
	cp "$(BUILD_DIR)/life-simulation.pdf" "$(OUTPUT_DIR)/life-simulation.pdf"

release-check: test
	$(NODE) scripts/verify-vendored-sources.mjs --release
	test -s output/pdf/life-simulation.pdf

release: paper
	$(MAKE) release-check
	$(NODE) scripts/export-release.mjs

release-export:
	$(NODE) scripts/export-release.mjs

clean:
	$(LATEXMK) -C -cd -pdf -output-directory="$(BUILD_DIR)" paper/life-simulation.tex
