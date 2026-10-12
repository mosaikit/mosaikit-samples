// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { expect, test } from '@playwright/test';
import { api, member, openApp, signIn, unique } from '@mosaikit/testing/playwright';

test('an activity added in the app is kept for the organization, behind row-level security', async ({
  page,
}) => {
  await signIn(page, member());
  await openApp(page, 'Activities');
  const title = unique('Fix the street lamp');
  await page.getByLabel('New activity').fill(title);
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.locator('li').filter({ hasText: title })).toBeVisible();

  // A colleague of the same organization reads it through the API of the extension.
  const { status, body } = await api(member(1), '/api/v1/ext/sample-activities/activities');
  expect(status).toBe(200);
  expect(JSON.stringify(body)).toContain(title);
});
