<!--
SPDX-FileCopyrightText: 2026 Massimo Antonini
SPDX-License-Identifier: MPL-2.0
-->
# Chat

The app Chat (MK-036): chats one to one and in groups, with their history, the indicators of
typing and reading, and the cards that extensions publish. An extension without a backend
([ADR-0033](https://github.com/mosaikit/mosaikit/blob/main/docs/adr/0033-lean-collaboration.md)):

- a chat is a group of the kernel of kind `chat` (`POST /api/v1/teams` with `kind: chat` and
  `people`), seen only by its people; the chat between two people without a name is always the
  same;
- its messages are documents of the collection `messages` shared with the chat, kept as history;
  the collection `reads` holds what each person read last and when they last typed;
- messages arrive at once through the real-time channel, and each one notifies the others in their
  activity feed (kind `message`, which they can turn off).

## Cards

Another extension publishes a card by adding a message to the chat, as the person whose page runs it:

```js
await context.fetch(`/api/v1/data/dev.mosaikit.app.chat/messages?team=${chat}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'A new inspection',
    card: {
      title: 'Inspection in Via Roma',
      fields: [{ label: 'When', value: 'Monday at 9' }],
      actions: [
        { label: 'Open', link: '/app/activities' },
        { label: 'I take it', request: { method: 'POST', path: '/api/v1/ext/…', body: { … } } },
      ],
    },
  }),
});
```

An action runs in the page of the person who chooses it, with their rights: a `link` opens a page
of the shell, a `request` calls the API of the kernel (`/api/v1/…`) as them.

Nothing to build: installed from the Extensions page, it is active at once. Its tests are in `tests/`.

## Build and test

A project of its own: Java 25, Maven and Node.js 24, nothing else. Its POM names the parent of
Mosaikit extensions, `io.github.mosaikit:mosaikit-extension-parent`.

```bash
mvn package    # target/<name>-<version>.zip, the package to install
mvn verify     # also the tests of tests/, on a Mosaikit installation started for them
npm test       # the same tests, after mvn package
npm run dev    # Mosaikit with this extension, until Ctrl+C
```

The tests also install the sample `todo`: build it first (`cd ../todo && mvn package`).
