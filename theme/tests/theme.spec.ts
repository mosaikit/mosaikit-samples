// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { expect, test } from '@playwright/test';
import { member, signIn } from '@mosaikit/testing/playwright';

test('the Green theme is offered in the settings, and the shell follows it', async ({ page }) => {
  await signIn(page, member());
  const root = page.locator('html');
  await page.getByRole('button', { name: /^Account:/ }).click();
  await page.getByRole('dialog', { name: 'Account' }).getByRole('link', { name: 'Settings' }).click();
  await page.getByLabel('Theme').selectOption({ label: 'Green' });
  await page.getByRole('radio', { name: 'Light' }).check();
  await expect(root).toHaveAttribute('data-mk-theme', 'dev.mosaikit.sample.theme');
  await expect
    .poll(() => root.evaluate((html) => getComputedStyle(html).getPropertyValue('--mk-accent').trim()))
    .toBe('#1b6e3c');
});
