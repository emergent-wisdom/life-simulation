LATEXMK ?= latexmk
BUILD_DIR := $(CURDIR)/build
OUTPUT_DIR := $(CURDIR)/output/pdf

.PHONY: all paper clean

all: paper

paper:
	mkdir -p "$(BUILD_DIR)" "$(OUTPUT_DIR)"
	$(LATEXMK) -cd -pdf -interaction=nonstopmode -halt-on-error \
		-output-directory="$(BUILD_DIR)" paper/life-simulation.tex
	cp "$(BUILD_DIR)/life-simulation.pdf" "$(OUTPUT_DIR)/life-simulation.pdf"

clean:
	$(LATEXMK) -C -cd -pdf -output-directory="$(BUILD_DIR)" paper/life-simulation.tex
