// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
/**
 * Points the dependencies on Mosaikit (@mosaikit/sdk, @mosaikit/testing) to a version of it:
 *
 *   node scripts/use-mosaikit.mjs latest           the latest snapshot of main
 *   node scripts/use-mosaikit.mjs <version>        a snapshot (0.1.0-dev.<date>.<run>) or a release
 *   node scripts/use-mosaikit.mjs --local <path>   a checkout of Mosaikit, built and packed here
 *
 * Then `npm install`. With --local, set MOSAIKIT_INSTALLATION=<path>/target/dist/mosaikit too: the
 * packages go to .mosaikit/.
 */
import { execSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SNAPSHOTS = 'https://github.com/mosaikit/mosaikit/releases/download/snapshot';
const PACKAGES = { '@mosaikit/sdk': 'sdk/js', '@mosaikit/testing': 'sdk/testing' };
const MANIFESTS = ['package.json', 'react/package.json', 'vue/package.json'];

/** The tarball name that `npm pack` gives a scoped package. */
const tarball = (name, version) => `${name.slice(1).replace('/', '-')}-${version}.tgz`;

async function sources(argv) {
  if (argv[0] === '--local') {
    const checkout = resolve(argv[1] ?? '.');
    const workspaces = Object.values(PACKAGES).map((path) => `-w ${path}`).join(' ');
    execSync(`npm run build ${workspaces}`, { cwd: checkout, stdio: 'inherit' });
    const target = resolve('.mosaikit');
    mkdirSync(target, { recursive: true });
    for (const path of Object.values(PACKAGES)) {
      execSync(`npm pack "${join(checkout, path)}" --pack-destination "${target}"`, {
        stdio: 'inherit',
      });
    }
    const packed = readdirSync(target);
    return (name, from) => {
      const file = packed.filter((f) => f.startsWith(tarball(name, '').replace(/\.tgz$/, ''))).at(-1);
      return `file:${[...(from === '.' ? [] : ['..']), '.mosaikit', file].join('/')}`;
    };
  }
  let version = argv[0] ?? 'latest';
  if (version === 'latest') {
    const response = await fetch(`${SNAPSHOTS}/snapshot.json`);
    if (!response.ok) {
      throw new Error(`No snapshot published yet (${String(response.status)})`);
    }
    version = (await response.json()).version;
  }
  return (name) =>
    version.includes('-dev.') ? `${SNAPSHOTS}/${tarball(name, version)}` : version;
}

const source = await sources(process.argv.slice(2));
for (const manifest of MANIFESTS) {
  const json = JSON.parse(readFileSync(manifest, 'utf8'));
  const from = manifest === 'package.json' ? '.' : '..';
  for (const field of ['dependencies', 'devDependencies']) {
    for (const name of Object.keys(PACKAGES)) {
      if (json[field]?.[name] !== undefined) {
        json[field][name] = source(name, from);
      }
    }
  }
  writeFileSync(manifest, `${JSON.stringify(json, null, 2)}\n`);
}
process.stdout.write('Dependencies on Mosaikit updated: now run npm install.\n');
