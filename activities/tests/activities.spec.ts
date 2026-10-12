// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { expect, test } from '@playwright/test';
import { member, openApp, signIn, unique } from '@mosaikit/testing/playwright';

test('Estimates adds a field and a total to Activities, without a foreign key', async ({ page }) => {
  await signIn(page, member());
  await openApp(page, 'Activities');
  const title = unique('Fix the street lamp');
  await page.getByLabel('New activity').fill(title);
  await page.getByRole('button', { name: 'Add' }).click();
  const item = page.locator('li').filter({ hasText: title });
  await expect(item).toBeVisible();
  const estimate = item.getByLabel('Estimated hours');
  await estimate.fill('3');
  await estimate.press('Tab');
  await expect(page.getByText(/Estimated: \d+(\.\d+)? h/)).toBeVisible();
});
