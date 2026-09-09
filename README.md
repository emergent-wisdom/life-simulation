# Life Simulation

Life Simulation studies explicit time-indexed worlds: continuous,
discrete-event, and hybrid process paths; the mechanisms that advance them;
the observations they produce; and the models that may learn from both at
once. This standalone paper repository contains the current manuscript,
PDF, bibliography, and build files. It contains no Rust engine or MCP
server; the companion [Meaning Model repository](https://github.com/emergent-wisdom/meaning-model)
owns that implementation.

Read the [paper PDF](output/pdf/life-simulation.pdf), its [LaTeX source](paper/life-simulation.tex),
and its [citation metadata](CITATION.cff), which
identifies the manuscript.

An earlier edition and source archive were published on [Zenodo](https://zenodo.org/records/22421847)
on 5 September 2026: [doi:10.5281/zenodo.22421847](https://doi.org/10.5281/zenodo.22421847).
The revision dated 9 September 2026 (UTC) is published on
[Figshare](https://figshare.com/articles/preprint/33507805):
[doi:10.6084/m9.figshare.33507805.v1](https://doi.org/10.6084/m9.figshare.33507805.v1).
The Zenodo DOI above identifies the earlier edition.

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
Understanding Graph revisions. The Meaning Model repository owns that software. The
paper's implementation and evaluation sections distinguish these mechanisms
from the proposed integrated learning system and specify how to evaluate it.

## Repository map

- `paper/life-simulation.tex` — canonical Life Simulation method paper.
- `paper/references.bib` and `paper/emergentwisdom-longform.sty` — build dependencies.
- `output/pdf/life-simulation.pdf` — rendered manuscript.
- `docs/figures/concept-solution-loop.png` — the overview diagram above.
- `CITATION.cff` — citation metadata.
- `Makefile` — PDF build command.
- `LICENSE`, `LICENSE-CONTENT`, and `NOTICE` — licensing and attribution.

## Build the paper

To rebuild the PDF, install Make and a LaTeX distribution with `latexmk`,
pdfLaTeX, BibTeX, and the packages used by the paper, then run:

```sh
make paper
```

Output goes to `output/pdf/life-simulation.pdf`, with temporary build files
under `build/`. No Node.js, runtime code, or sibling checkout is needed.
The released PDF can be read without installing tools.

Code is licensed under [MIT](LICENSE); authored papers and documentation are
licensed under [CC BY 4.0](LICENSE-CONTENT). See [NOTICE](NOTICE) for scope and
third-party attribution.
