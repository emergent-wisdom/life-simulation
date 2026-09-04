import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, readdir, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { exportRelease } from './export-release.mjs';

async function fixture(files = ['README.md']) {
  const root = await mkdtemp(join(tmpdir(), 'life-simulation-release-test-'));
  await writeFile(join(root, 'release-files.json'), JSON.stringify({ files }));
  await writeFile(join(root, 'README.md'), 'Public paper\n');
  await mkdir(join(root, '.git'));
  await writeFile(join(root, 'private-notes.md'), 'Not selected\n');
  return root;
}

test('exports only selected files and hashes the exact exported bytes', async () => {
  const root = await fixture();
  const { destination, files } = await exportRelease(root);
  assert.equal(files, 1);
  assert.deepEqual((await readdir(destination)).sort(), ['README.md', 'RELEASE-MANIFEST.json']);
  const manifest = JSON.parse(await readFile(join(destination, 'RELEASE-MANIFEST.json')));
  const bytes = await readFile(join(destination, 'README.md'));
  assert.deepEqual(manifest.files, [{ path: 'README.md', bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex') }]);
});

test('refuses existing destinations and in-repository destinations outside build', async () => {
  const root = await fixture();
  const { destination } = await exportRelease(root);
  await assert.rejects(exportRelease(root, destination), { code: 'EEXIST' });
  await assert.rejects(exportRelease(root, join(root, 'public')), /beneath build/);
});

test('rejects traversal, development history, runtimes, and directories', async () => {
  for (const entry of ['../outside', '.git/config', '/absolute', 'construction/book.md',
    'paper/archive/old.tex', 'paper/SPLIT-MIGRATION.md', 'rust-engine/Cargo.toml']) {
    const root = await fixture([entry]);
    await assert.rejects(exportRelease(root), /Unsafe release path/);
  }
  const root = await fixture(['paper']);
  await mkdir(join(root, 'paper'));
  await assert.rejects(exportRelease(root), /individual files/);
});

test('rejects file symlinks and symlinks in parent directories', async () => {
  const root = await fixture(['linked.md']);
  await symlink(join(root, 'private-notes.md'), join(root, 'linked.md'));
  await assert.rejects(exportRelease(root), /must not be symlinks/);
  const nested = await fixture(['linked/README.md']);
  await symlink(root, join(nested, 'linked'));
  await assert.rejects(exportRelease(nested), /must not be symlinks/);
});

test('missing required public inputs fail before creating an export', async () => {
  const root = await fixture(['missing.pdf']);
  await assert.rejects(exportRelease(root), { code: 'ENOENT' });
  assert.ok(!(await readdir(root)).includes('build'));
});

test('the paper release allowlist is explicit and contains its standalone requirements', async () => {
  const specification = JSON.parse(await readFile(new URL('../release-files.json', import.meta.url)));
  assert.equal(new Set(specification.files).size, specification.files.length);
  for (const required of ['LICENSE', 'LICENSE-CONTENT', 'NOTICE', 'paper/life-simulation.tex',
    'paper/emergentwisdom-longform.sty', 'paper/references.bib', 'output/pdf/life-simulation.pdf',
    'paper/lifesim-structure.test.mjs', 'scripts/verify-vendored-sources.mjs']) {
    assert.ok(specification.files.includes(required), `Missing public input: ${required}`);
  }
  for (const name of specification.files) {
    assert.ok(!name.split('/').some(part => ['construction', 'archive', 'checkpoints',
      'internal', 'rust-engine', 'mcp-server', 'SPLIT-MIGRATION.md'].includes(part)), name);
  }
});
