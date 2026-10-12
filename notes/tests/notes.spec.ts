// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { expect, test } from '@playwright/test';
import { api, member, openApp, signIn, unique } from '@mosaikit/testing/playwright';

test('a note written in the app is kept by the Java backend for the organization', async ({ page }) => {
  await signIn(page, member());
  await openApp(page, 'Notes');
  const text = unique('Call the plumber');
  await page.getByLabel('New note').fill(text);
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByText(text)).toBeVisible();

  // A colleague of the same organization reads it through the API of the plugin.
  const { status, body } = await api(member(1), '/api/v1/p/sample-notes/notes');
  expect(status).toBe(200);
  expect(JSON.stringify(body)).toContain(text);
});
