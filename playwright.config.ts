// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { defineConfig, devices } from '@playwright/test';

/** The tests of every sample, on one bench with all of them (tests/global-setup.ts). */
export default defineConfig({
  testDir: '.',
  testMatch: '*/tests/*.spec.ts',
  globalSetup: './tests/global-setup.ts',
  workers: 1,
  timeout: 60_000,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['list'], ['github']] : [['list']],
  use: { trace: 'retain-on-failure', ...devices['Desktop Chrome'] },
});
