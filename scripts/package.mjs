// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
/**
 * Writes the package of every sample to packages/: the zips that Maven built for the samples with
 * Java code, and a zip of what the kernel reads for the others (after `npm run build`).
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const JAVA = ['notes', 'activities', 'estimates'];
const FRONTEND = ['hello', 'react', 'vue', 'todo', 'theme'];
const PARTS = ['manifest.yaml', 'README.md', 'web', 'dist', 'db', 'lib', 'i18n'];
const jar = process.env.JAVA_HOME ? join(process.env.JAVA_HOME, 'bin', 'jar') : 'jar';

rmSync('packages', { recursive: true, force: true });
mkdirSync('packages');
for (const name of JAVA) {
  const built = readdirSync(join(name, 'target')).find((file) => file.endsWith('.zip'));
  if (!built) {
    throw new Error(`No package in ${name}/target: run mvn package`);
  }
  copyFileSync(join(name, 'target', built), join('packages', built));
}
for (const name of FRONTEND) {
  const version = /^version:\s*(\S+)/m.exec(readFileSync(join(name, 'manifest.yaml'), 'utf8'))[1];
  const target = join('packages', `sample-${name}-${version}.zip`);
  const parts = PARTS.filter((part) => existsSync(join(name, part))).flatMap((part) => ['-C', name, part]);
  execFileSync(jar, ['--create', '--no-manifest', '--file', target, ...parts]);
}
process.stdout.write(`${readdirSync('packages').join('\n')}\n`);
