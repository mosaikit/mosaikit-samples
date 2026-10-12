// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { expect, test } from '@playwright/test';
import { member, openApp, signIn } from '@mosaikit/testing/playwright';

test('Hello shows who is signed in and receives the event it publishes', async ({ page }) => {
  await signIn(page, member());
  await openApp(page, 'Hello');
  await expect(page.getByRole('heading', { name: 'Hello' })).toBeVisible();
  await expect(page.getByText(`Signed in as ${member().name}`)).toBeVisible();
  await page.getByRole('button', { name: 'Publish an event' }).click();
  await expect(page.getByRole('status')).toContainText('Received sample.hello.greeted');
});
