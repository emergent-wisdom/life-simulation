import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repositoryRoot = new URL('../', import.meta.url);
const argumentsSet = new Set(process.argv.slice(2));
for (const argument of argumentsSet) {
  assert.ok(['--release', '--runtime'].includes(argument), `Unknown argument: ${argument}`);
}
const releaseMode = argumentsSet.has('--release');
const runtimeMode = argumentsSet.has('--runtime');

function digest(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

const meaningDirectory = new URL('paper/snapshots/meaning-model/', repositoryRoot);
const meaningSource = JSON.parse(
  await readFile(new URL('SOURCE.json', meaningDirectory), 'utf8'),
);
assert.equal(meaningSource.schema, 'life-simulation-vendored-source/v1');
assert.equal(meaningSource.artifact, 'meaning-model.tex');
assert.match(meaningSource.sha256, /^[0-9a-f]{64}$/);
const meaningBytes = await readFile(new URL(meaningSource.artifact, meaningDirectory));
assert.equal(
  digest(meaningBytes),
  meaningSource.sha256,
  'Vendored Meaning Model source does not match SOURCE.json.',
);
assert.equal(meaningSource.grammar_artifact, 'meaning-model-grammar.tex');
assert.match(meaningSource.grammar_sha256, /^[0-9a-f]{64}$/);
const grammarBytes = await readFile(
  new URL(meaningSource.grammar_artifact, meaningDirectory),
);
assert.equal(
  digest(grammarBytes),
  meaningSource.grammar_sha256,
  'Vendored Meaning Model grammar reference does not match SOURCE.json.',
);
assert.equal(meaningSource.interface_artifact, 'interface-blocks.tex');
assert.match(meaningSource.interface_sha256, /^[0-9a-f]{64}$/);
const interfaceBytes = await readFile(
  new URL(meaningSource.interface_artifact, meaningDirectory),
);
assert.equal(
  digest(interfaceBytes),
  meaningSource.interface_sha256,
  'Vendored Meaning Model interface does not match SOURCE.json.',
);
if (releaseMode) {
  assert.equal(meaningSource.canonical_repository, 'meaning-model');
  assert.equal(meaningSource.source_state, 'content_addressed_release_snapshot');
  assert.equal(meaningSource.release_provenance_status, 'content_verified');
  assert.deepEqual(meaningSource.source_paths, {
    'meaning-model.tex': 'paper/meaning-model.tex',
    'meaning-model-grammar.tex': 'paper/meaning-model-grammar.tex',
    'interface-blocks.tex': 'paper/includes/interface-blocks.tex',
  });
  if (meaningSource.commit != null) assert.match(meaningSource.commit, /^[0-9a-f]{40}$/);
}

if (runtimeMode) {
  const meaningModelRoot = pathToFileURL(
    resolve(fileURLToPath(repositoryRoot), process.env.MEANING_MODEL_ROOT ?? '../meaning-model') + sep,
  );
  const presetDirectory = new URL('mcp-server/resources/presets/', meaningModelRoot);
  const presetSource = JSON.parse(await readFile(new URL('SOURCE.json', presetDirectory), 'utf8'));
  assert.equal(presetSource.schema, 'life-simulation-precompiled-presets/v1');
  assert.equal(presetSource.presets.length, 2);
  for (const preset of presetSource.presets) {
    const bytes = await readFile(new URL(preset.file, presetDirectory));
    assert.equal(digest(bytes), preset.sha256,
      `Precompiled preset ${preset.preset_id} does not match SOURCE.json.`);
  }
  console.log(`Verified ${presetSource.presets.length} optional companion runtime presets.`);
}

console.log(
  'Verified three bundled Meaning Model reference snapshots' +
    `${releaseMode ? ' with content-addressed release provenance' : ''}.`,
);
