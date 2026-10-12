// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { describe, expect, it } from 'vitest';
import { COLOURS, SELECTED as PUBLISHED } from '../../react/src/index.js';
import extension, { SELECTED, isColour } from '../src/index.js';

describe('Swatch, the Vue sample (MK-021)', () => {
  it('follows the topic and the payload that the React palette publishes', () => {
    expect(SELECTED).toBe(PUBLISHED);
    for (const colour of COLOURS) {
      expect(isColour({ name: colour.name, value: colour.value })).toBe(true);
    }
  });

  it('ignores payloads of other publishers', () => {
    expect(isColour(null)).toBe(false);
    expect(isColour('teal')).toBe(false);
    expect(isColour({ name: 'Teal' })).toBe(false);
    expect(isColour({ name: 'Teal', value: 'url(javascript:alert(1))' })).toBe(false);
  });

  it('is an extension frontend', () => {
    expect(typeof extension.activate).toBe('function');
  });
});
