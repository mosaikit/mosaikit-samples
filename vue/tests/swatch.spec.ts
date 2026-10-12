// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { expect, test } from '@playwright/test';
import { member, openApp, signIn } from '@mosaikit/testing/playwright';

test.describe('A Vue extension of a React app (MK-021)', () => {
  test('21.1–21.2 a Vue widget inside a React app receives its selection on the bus', async ({
    page,
  }) => {
    await signIn(page, member());
    await openApp(page, 'Palette');
    const swatch = page.locator('mk-sample-swatch');
    await expect(swatch).toHaveCount(1);
    await page.getByRole('button', { name: 'Teal' }).click();
    await expect(page.getByRole('button', { name: 'Teal' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(swatch.getByRole('status')).toHaveText('Teal');
  });
});
