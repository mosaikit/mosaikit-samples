// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { Bench, packagesIn } from '@mosaikit/testing';

/**
 * Starts Mosaikit with the package of this sample (mvn package) on an embedded PostgreSQL, with an
 * organization and two people, and stops it after the tests. The installation is downloaded once;
 * MOSAIKIT_INSTALLATION chooses another one, such as a build of Mosaikit.
 */
export default async function globalSetup(): Promise<() => Promise<void>> {
  const own = packagesIn('target');
  if (own.length === 0) {
    throw new Error('Build the sample first: mvn package');
  }
  const activities = packagesIn('../activities/target');
  if (activities.length === 0) {
    throw new Error('The tests also install the sample activities: build it first (cd ../activities && mvn package)');
  }
  const bench = await Bench.start({
    work: '.mosaikit-bench',
    plugins: [...own, ...activities],
    // The packages are not signed by a publisher: their frontends run like verified ones.
    settings: { 'mosaikit.plugins.unverified-frontends': 'module' },
  });
  bench.publish();
  return () => bench.stop();
}
