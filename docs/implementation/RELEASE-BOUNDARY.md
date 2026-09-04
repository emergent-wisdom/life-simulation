# Release boundary

This is a standalone paper release. It does not contain an engine, MCP server,
trained learner, or new experimental results. The Meaning Model repository
owns the shared Rust executor and MCP control plane. Default install and test
commands do not access it; explicit `install-runtime` and `test-runtime`
targets can use a separate checkout through `MEANING_MODEL_ROOT`.

The completed *Book of Conditions* and its accepted model are Meaning Model
artifacts: a partial descriptive construction witness, not a completed Life
Simulation experiment. No old construction or checkpoint is required here.

## Included

- Current Life Simulation LaTeX, bibliography, style, and rendered PDF.
- Public structure map and manuscript guards.
- Three digest-bound Meaning Model reference snapshots, their provenance
  record, and a short explanation of their status.
- Citation metadata, licensing, release documentation, and the file allowlist.
- Dependency-free export and verification scripts with tests.

## Excluded

- Development Git history and local repository configuration.
- Old constructions, checkpoints, private notes, conversations, audits,
  migration ledgers, and superseded manuscripts.
- Runtime source copies, profiles, fixtures, and databases owned by the
  separate Meaning Model implementation.
- Installed dependencies, LaTeX auxiliaries, temporary files, and unselected
  generated reports.

Snapshot provenance binds exact bytes and their canonical source paths. It
does not invent a public commit, tag, repository URL, or DOI. Content hashes
allow the two companion releases to be assembled without circular initial
commit requirements.

Code is MIT-licensed; authored papers and documentation are CC BY 4.0. The
root license files and `NOTICE` state the scope and retained third-party terms.
The [release guide](../RELEASE.md) describes clean-tree preparation and the
remaining publication decisions. Packaging does not establish scientific validity.
