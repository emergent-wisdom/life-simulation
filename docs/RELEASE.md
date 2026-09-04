# Release preparation

This release publishes the current Life Simulation paper and the files needed
to read, build, and check it. The research program remains a proposal; packaging
adds no training, transfer, alignment, or comparative result.

## Build and check

Standalone checks require Node.js 22 or newer and Make, with no npm
dependencies or sibling checkout. Rebuilding the PDF also requires LaTeX,
BibTeX, and `latexmk`.

```sh
make install
make test
make paper
make release-check
```

The source check verifies three bundled Meaning Model reference files against
their SHA-256 record. The release check additionally requires their canonical
repository and source paths to be identified as a content-addressed release
snapshot. The release owner must synchronize these files and the reciprocal
Life Simulation snapshot before freezing the pair. Future public commits or
archival identifiers may be added when assigned; they are not invented to
satisfy a packaging check.

## Export the public tree

```sh
make release-export
```

`release-files.json` names every public file individually. The exporter creates
a fresh directory under `build/` and writes `RELEASE-MANIFEST.json` with sizes
and SHA-256 digests. It refuses existing destinations, traversal, symlinks,
development-history paths, and directory entries. Unselected files never enter
the export. The MIT code license, CC BY 4.0 content license, and `NOTICE` are
required release files; existing third-party notices retain their scope.

`make release` rebuilds the PDF, checks the release, and exports in that order.
For a coordinated pair that has already been built and reviewed, use
`release-export` after the final checks. Any subsequent source change requires
a new export. Snapshot digests identify a frozen pair, not a claim that its
files already have public Git history.

Review the exported manifest and run `make install` and `make release-check`
inside the exported directory. The public tree excludes private development
history, old constructions and checkpoints, audits, migration ledgers, archives,
and all runtime code. The included structure map describes the current paper;
it is not a historical audit.

## Publication handoff

The initial destination is the owner-created private repository at
https://github.com/emergent-wisdom/life-simulation. Upload only the reviewed
exported tree, initializing fresh Git history with exactly one initial commit.
Do not push or rewrite development history, or change repository visibility
as part of this upload. The export scripts do not initialize Git or push.
See [the file inventory](FILE-INVENTORY.md) for every included file and its purpose.

The release owner can add a public release date, DOI, or archival identifier
when assigned. None is invented for the private upload. The manuscript date
identifies the paper version, not an assigned
public release date. See the [release boundary](implementation/RELEASE-BOUNDARY.md)
and root license files for the exact content and licensing scope.
