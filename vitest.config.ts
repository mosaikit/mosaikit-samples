// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { defineConfig } from 'vitest/config';

/** The unit tests of the samples; their Playwright tests (tests/*.spec.ts) run with npm test. */
export default defineConfig({
  test: { include: ['*/test/**/*.test.ts'], environment: 'node' },
});
