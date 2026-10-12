// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
import { BENCH_ADMIN, type Person } from '@mosaikit/testing';

/** The organization of the tests and its people, as the bench creates them. */
export const ORGANIZATION = { slug: 'comune-prova', name: 'Comune di Prova' };
export const ADMIN: Person = BENCH_ADMIN;
export const MARIO: Person = {
  user: 'mario.rossi@comune.test',
  password: 'Prova-2026-sicura',
  name: 'Mario Rossi',
};
export const ANNA: Person = {
  user: 'anna.bianchi@comune.test',
  password: 'Prova-2026-sicura',
  name: 'Anna Bianchi',
};
export type { Person };
