# Life Simulation

Life Simulation studies explicit time-indexed worlds: continuous,
discrete-event, and hybrid process paths; the mechanisms that advance them;
the observations they produce; and the models that may learn from both at
once. This standalone paper repository contains the current manuscript,
PDF, bibliography, build files, and checks. It contains no Rust engine or MCP
server; the companion [Meaning Model repository](https://github.com/emergent-wisdom/meaning-model)
owns that implementation.

Read the [paper PDF](output/pdf/life-simulation.pdf), its [LaTeX source](paper/life-simulation.tex),
or the [structure map](paper/LIFESIM-STRUCTURE.md). [Citation metadata](CITATION.cff)
identifies the manuscript.

The paper and source archive were published on [Zenodo](https://zenodo.org/records/22348228)
on 5 September 2026: [doi:10.5281/zenodo.22348228](https://doi.org/10.5281/zenodo.22348228).

The [file inventory](docs/FILE-INVENTORY.md) explains every uploaded file;
[`RELEASE-MANIFEST.json`](RELEASE-MANIFEST.json) records exact sizes and hashes.

The paper uses the Meaning Model as its selected world interface but does not
own that grammar or its construction method. The companion Meaning Model paper
specifies progressive world, concept, and narrative construction, including
*The Book of Conditions*, rendering, read-back, and the matched story
comparison. Life Simulation proposes continuations and revisions while those
worlds are being constructed, and learns from released histories. It studies
process simulation, candidate dynamics, a joint process sensorium, generative
inversion, and prospective prediction. Meaning Model governs the acceptance
of those evolving records; this is not a handoff from a finished world.

The curated accepted Book, its model sources, linked rationales, and
reproducible import are released by the companion repository. They belong to the Meaning
Model construction, not to Life Simulation's proposed learning experiments.

## Method and implementation

The paper develops the method and specifies experiments for evaluating its
learning hypotheses.

![Fractal Intelligence searches for concepts and solutions; simulation projects their effects; the continuing Reader evaluates consequences for people. The Meaning Model connects these roles, with feedback from evaluation and later observations.](docs/figures/concept-solution-loop.png)

Fractal Intelligence searches for useful concepts and problem decompositions,
not only those already named by people. Life Simulation explores what could
happen if a proposed solution were implemented. The continuing Reader applies
the Reader Core through Refraction to evaluate effects on people's wants,
choices, and burdens over time. The Meaning Model supplies their shared world
and concept representation. These are functional roles, not necessarily
separate AI models: simulation can use an AI model, numerical tools, or both.
Evaluated world and construction histories can support training, while better
tools and strategies can improve the next attempt without retraining.

The existing Rust executor provides immutable typed model revisions,
versioned world heads, seeded process-state candidates, inspection, reroll,
rejection, and atomic compare-and-swap commit for its current scalar-process
profile. It can host optional static Meaning Model records and Narrative
Understanding Graph revisions. See the [implementation
boundary](docs/implementation/RELEASE-BOUNDARY.md) for software ownership. The
paper's implementation and evaluation sections distinguish these mechanisms
from the proposed integrated learning system and specify how to evaluate it.

## Repository map

- `paper/life-simulation.tex` — canonical Life Simulation method paper.
- `paper/references.bib` and `paper/emergentwisdom-longform.sty` — build dependencies.
- `paper/LIFESIM-STRUCTURE.md` — public editorial and evidence-boundary map.
- `paper/lifesim-structure.test.mjs` — manuscript structure guards.
- `paper/snapshots/meaning-model/` — digest-bound companion Meaning Model
  interface used by this paper's checks; it is not a second canonical source.
- `output/pdf/life-simulation.pdf` — rendered manuscript.
- `CITATION.cff`, `docs/RELEASE.md`, and `release-files.json` — citation and release metadata.
- `scripts/` — the allowlisted export and source-verification tools.

## Build and test

Paper checks need Node.js 22 or newer and Make. There are no npm dependencies
and no sibling repository is required. LaTeX is needed only to rebuild the PDF.

```sh
make install
make test
```

`make install` checks the Node.js version. `make test` runs the manuscript
structure guards, release exporter tests, and bundled-snapshot digest checks.

The structure guard protects
the canonical paper's process-first thesis, seven-stage bootstrap, asymmetric
Meaning Model boundary, evidence gates, executor gaps, and the absence of stale
artifact evidence. It does not replace scientific, citation, or visual review.

To rebuild the PDF, install a LaTeX distribution with `latexmk`, pdfLaTeX,
BibTeX, and the packages used by the paper, then run `make paper`. Output goes
to `output/pdf/life-simulation.pdf`, with temporary build files under `build/`.
The released PDF can be read without installing tools.

## Optional shared-runtime checks

The Meaning Model repository owns the shared Rust executor and MCP interface.
If it is checked out alongside this repository, these explicitly optional
commands install its Node dependencies and run its runtime suites:

```sh
make install-runtime
make test-runtime
```

Use `MEANING_MODEL_ROOT=/absolute/path/to/meaning-model` for another location.
These commands additionally require Rust/Cargo and npm. They do not train the
proposed Life Simulation learner. Consult the companion's own implementation
documentation before using its tools.

## Source and publication boundary

The canonical Meaning Model paper belongs in the separate `meaning-model`
repository. The checked snapshot under `paper/snapshots/meaning-model/` remains
the digest-bound companion interface for repository tooling; the recentered
Life Simulation manuscript summarizes that interface rather than compiling its
grammar block. Update the snapshot only through the repository's
source-verification process. These three TeX files are reference snapshots;
they are not a complete buildable copy of the companion paper.

The [release guide](docs/RELEASE.md) explains clean-tree export without
development history. Only individually allowlisted files enter the export;
old constructions, checkpoints, private notes, migration ledgers, audits, and
archives stay out. Exporting creates no commit, remote, or publication.

Code is licensed under [MIT](LICENSE); authored papers and documentation are
licensed under [CC BY 4.0](LICENSE-CONTENT). See [NOTICE](NOTICE) for scope and
third-party attribution.
