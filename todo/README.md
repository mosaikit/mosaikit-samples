<!--
SPDX-FileCopyrightText: 2026 Massimo Antonini
SPDX-License-Identifier: MPL-2.0
-->
# To do (sample)

An app without a backend ([ADR-0031](https://github.com/mosaikit/mosaikit/blob/main/docs/adr/0031-frontend-plugins-on-the-data-api.md)):
its items are documents of the collection `items`, declared in `data.collections` of the manifest
and kept by the kernel for the organization of the person, under row-level security. The frontend
reads and writes them with `context.data('items')`. No Java, no schema, nothing to build: installed
from the Plugins page, it is active at once, without a restart.

## Build and test

A project of its own: Java 25, Maven and Node.js 24, nothing else. Its POM names the parent of
Mosaikit plugins, `io.github.mosaikit:mosaikit-plugin-parent`.

```bash
mvn package    # target/<name>-<version>.zip, the package to install
mvn verify     # also the tests of tests/, on a Mosaikit installation started for them
npm test       # the same tests, after mvn package
npm run dev    # Mosaikit with this plugin, until Ctrl+C
```
