// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { Bench, packagesIn } from '@mosaikit/testing';
import { ADMIN, ANNA, MARIO, ORGANIZATION } from './people.js';

/**
 * Starts Mosaikit with the sample To do installed, which Teams shows, and Teams in its catalog:
 * the tests install it as an administrator does. Build first: mvn package here and in ../todo.
 */
export default async function globalSetup(): Promise<() => Promise<void>> {
  const own = packagesIn('target');
  if (own.length === 0) {
    throw new Error('Build the app first: mvn package');
  }
  const todo = packagesIn('../todo/target');
  if (todo.length === 0) {
    throw new Error('The tests also install the sample todo: build it first (cd ../todo && mvn package)');
  }
  const bench = await Bench.start({
    work: '.mosaikit-bench',
    port: 18201,
    extensions: todo,
    catalog: own,
    admin: ADMIN,
    organization: ORGANIZATION,
    people: [MARIO, ANNA],
    // The packages are not signed by a publisher: their frontends run like verified ones.
    settings: { 'mosaikit.extensions.unverified-frontends': 'module' },
  });
  bench.publish();
  return () => bench.stop();
}
