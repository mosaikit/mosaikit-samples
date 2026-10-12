// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { resolve } from 'node:path';
import { Bench, packagesIn } from '@mosaikit/testing';

/** The samples with Java code are built by Maven; the others are installed as directories. */
const JAVA = ['notes', 'activities', 'estimates'];
const FRONTEND = ['hello', 'react', 'vue', 'todo', 'theme'];

/**
 * Starts Mosaikit with every sample, on an embedded PostgreSQL, with an organization and two people.
 * Build first: `mvn package` and `npm run build`.
 */
export default async function globalSetup(): Promise<() => Promise<void>> {
  const packages = packagesIn(...JAVA.map((name) => resolve(name, 'target')));
  if (packages.length !== JAVA.length) {
    throw new Error('Build the samples with Java code first: mvn package');
  }
  const bench = await Bench.start({
    work: '.mosaikit-bench/test',
    plugins: [...packages, ...FRONTEND.map((name) => resolve(name))],
    // The samples are not signed in the tests: their frontends run like verified ones.
    settings: { 'mosaikit.plugins.unverified-frontends': 'module' },
  });
  bench.publish();
  return () => bench.stop();
}
