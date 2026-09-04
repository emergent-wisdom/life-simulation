import { createHash } from 'node:crypto';
import { lstat, mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const forbidden = new Set([
  '.git', '.DS_Store', 'node_modules', 'target', 'build',
  'construction', 'checkpoints', 'archive', 'internal', 'audits',
  'mcp-server', 'rust-engine', 'SPLIT-MIGRATION.md',
]);

export async function exportRelease(root, destination) {
  root = resolve(root);
  const specification = JSON.parse(await readFile(join(root, 'release-files.json'), 'utf8'));
  if (!Array.isArray(specification.files) || specification.files.length === 0) {
    throw new Error('The release allowlist must contain explicit files.');
  }
  const selected = [...new Set(specification.files)].sort();
  for (const name of selected) {
    if (typeof name !== 'string' || isAbsolute(name) || name.includes('\\') ||
      name.split('/').some(part => !part || part === '.' || part === '..' || forbidden.has(part))) {
      throw new Error(`Unsafe release path: ${name}`);
    }
    let source = root;
    const parts = name.split('/');
    for (const [index, part] of parts.entries()) {
      source = join(source, part);
      const info = await lstat(source);
      if (info.isSymbolicLink()) throw new Error(`Release paths must not be symlinks: ${name}`);
      if (index === parts.length - 1 && !info.isFile()) {
        throw new Error(`Release entries must name individual files: ${name}`);
      }
    }
  }

  if (destination) {
    destination = resolve(destination);
    const rel = relative(root, destination);
    if (!rel || (!rel.startsWith('..' + sep) && rel !== '..' && !isAbsolute(rel)
      && !rel.startsWith('build' + sep))) {
      throw new Error('An in-repository export must be a new directory beneath build/.');
    }
    await mkdir(destination);
  } else {
    await mkdir(join(root, 'build'), { recursive: true });
    destination = await mkdtemp(join(root, 'build', 'release-'));
  }

  const files = [];
  for (const name of selected) {
    const bytes = await readFile(join(root, name));
    const target = join(destination, name);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, bytes, { flag: 'wx' });
    files.push({ path: name, bytes: bytes.length,
      sha256: createHash('sha256').update(bytes).digest('hex') });
  }
  await writeFile(join(destination, 'RELEASE-MANIFEST.json'), JSON.stringify({
    schema: 'life-simulation-paper-release/v1',
    purpose: 'Clean paper export; not a published release or Git history.',
    files,
  }, null, 2) + '\n', { flag: 'wx' });
  return { destination, files: files.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length > 2) throw new Error('Usage: node scripts/export-release.mjs');
  const result = await exportRelease(fileURLToPath(new URL('../', import.meta.url)));
  console.log(`Exported ${result.files} files without Git history to ${result.destination}`);
}
