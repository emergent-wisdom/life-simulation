# Vendored Meaning Model source

`meaning-model.tex`, `meaning-model-grammar.tex`, and `interface-blocks.tex` are
byte-for-byte snapshots used by Life Simulation's paper and source checks.
The Meaning Model repository remains the canonical source. MCP reads that
canonical manuscript directly from the Meaning Model checkout; it does not
serve these snapshots.

`SOURCE.json` binds all three snapshots to their canonical source paths with
SHA-256. The file digests identify the release inputs without referring to
private development history or requiring circular references between the two
repositories' initial commits. Updating a snapshot requires an explicit source
update and matching digests. Public repository and archival identifiers can be
added when assigned.
