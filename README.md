# Life Simulation

## Learning from Worlds and Their Construction

Life Simulation proposes learning from how lives and worlds unfold and from
the decisions used to construct those worlds. The Meaning Model connects
events, numerical processes, concepts, text, and expressed understanding.
Training on these linked histories aims to develop understanding, prediction,
and care. The paper describes the proposal and experiments to test it.

[Read the paper](output/pdf/life-simulation.pdf) ·
[Zenodo](https://zenodo.org/records/22348228) ·
[LaTeX source](paper/life-simulation.tex)

Henrik Westerberg · September 5, 2026

DOI: [10.5281/zenodo.22348228](https://doi.org/10.5281/zenodo.22348228)

## Proposed integration

![Fractal Intelligence searches for concepts and solutions; simulation projects their effects; the continuing Reader evaluates consequences for people. The Meaning Model connects these roles, with feedback from evaluation and later observations.](docs/figures/concept-solution-loop.png)

Fractal Intelligence searches for useful concepts and problem decompositions,
not only those already named by people. Simulation explores what could happen
if a proposed solution were implemented. The continuing Reader applies the
Reader Core through Refraction to evaluate effects on people's wants, choices,
and burdens over time. These are functional roles, not necessarily separate
AI models: simulation can use an AI model, numerical tools, or both. Evaluated
histories can support training, while better tools and strategies can improve
the next attempt without retraining.

The companion [Meaning Model repository](https://github.com/emergent-wisdom/meaning-model)
contains the world representation, Rust implementation, MCP tools, and
*The Book of Conditions*.

## Build the paper

Install a LaTeX distribution with `latexmk`, pdfLaTeX, BibTeX, and the packages
used by the source, then run:

```sh
make paper
```

The PDF is written to `output/pdf/life-simulation.pdf`. No Node.js, Rust,
or companion checkout is needed. Run `make clean` to remove temporary build files.

## License

The paper, documentation, and figure are [CC BY 4.0](LICENSE-CONTENT).
Build and LaTeX style code are [MIT](LICENSE). See [NOTICE](NOTICE) for scope.
