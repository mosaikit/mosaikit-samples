// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { expect, test } from '@playwright/test';
import { api, member, openApp, signIn, unique } from '@mosaikit/testing/playwright';

test('the items of To do are documents of the organization, without a backend', async ({ page }) => {
  const title = unique('Paint the fence');
  await signIn(page, member());
  await openApp(page, 'To do');
  await page.getByLabel('New item').fill(title);
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('list', { name: 'Items' })).toContainText(title);
  await page.getByLabel(`Done: ${title}`).check();
  await page.reload();
  await expect(page.getByLabel(`Done: ${title}`)).toBeChecked();

  const seen = (await api(member(1), '/api/v1/data/dev.mosaikit.sample.todo/items')).body as {
    data: { title: string; done: boolean };
  }[];
  expect(seen.find((item) => item.data.title === title)?.data.done).toBe(true);
});
