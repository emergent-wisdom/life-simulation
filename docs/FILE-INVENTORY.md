# Initial upload inventory

Destination: https://github.com/emergent-wisdom/life-simulation

This standalone paper repository has 26 tracked files. The 25 release inputs
are explicitly selected in `release-files.json`; `RELEASE-MANIFEST.json` adds
their byte sizes and SHA-256 hashes. The manifest does not hash itself:
Git identifies the exact committed manifest along with the other files.

## Files and purposes

| File | Why it is included |
| --- | --- |
| `.gitignore` | Keeps temporary output, local notes, and build caches out of Git. |
| `CITATION.cff` | Author, title, repository URL, and preferred citation. |
| `LICENSE` | MIT terms for original software and build/check scripts. |
| `LICENSE-CONTENT` | CC BY 4.0 terms for original papers and authored content. |
| `NOTICE` | Separates code/content licensing and preserves third-party rights. |
| `README.md` | Research overview, evidence limits, repository map, and quick start. |
| `Makefile` | Builds the PDF and runs standalone checks; runtime checks are opt-in. |
| `release-files.json` | Explicit list of the 25 release inputs. |
| `RELEASE-MANIFEST.json` | Byte count and SHA-256 for every release input. |
| `docs/FILE-INVENTORY.md` | This explanation of the uploaded files. |
| `docs/RELEASE.md` | Reproducible export and release procedure. |
| `docs/implementation/RELEASE-BOUNDARY.md` | What this paper release does and does not provide. |
| `output/pdf/life-simulation.pdf` | Ready-to-read Life Simulation paper. |
| `paper/life-simulation.tex` | Canonical LaTeX source for that PDF. |
| `paper/references.bib` | Bibliographic records used by the paper. |
| `paper/emergentwisdom-longform.sty` | Local LaTeX style needed to rebuild it. |
| `paper/LIFESIM-STRUCTURE.md` | Map of the current paper's argument and evidence boundaries. |
| `paper/lifesim-structure.test.mjs` | Checks manuscript structure, citations, and stated boundaries. |
| `paper/snapshots/meaning-model/README.md` | Explains why companion reference sources are included. |
| `paper/snapshots/meaning-model/SOURCE.json` | Canonical source paths and exact snapshot digests. |
| `paper/snapshots/meaning-model/meaning-model.tex` | Reference copy of the companion theory paper, not another canonical source. |
| `paper/snapshots/meaning-model/meaning-model-grammar.tex` | Companion grammar reference used by source checks. |
| `paper/snapshots/meaning-model/interface-blocks.tex` | Shared interface definitions retained with those references. |
| `scripts/export-release.mjs` | Copies only allowlisted files and generates the checksum manifest. |
| `scripts/export-release.test.mjs` | Tests export selection and rejection of unsafe inputs. |
| `scripts/verify-vendored-sources.mjs` | Verifies companion snapshot digests; runtime checks require an explicit option. |
