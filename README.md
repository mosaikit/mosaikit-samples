# Mosaikit samples

The sample plugins of [Mosaikit](https://github.com/mosaikit/mosaikit): the examples of its
[plugin development guide](https://github.com/mosaikit/mosaikit/blob/main/docs/development/plugin-development.md).
Each directory is a plugin, built and tested only against what Mosaikit publishes, exactly as a
plugin of a third party (ADR-0035).

| Sample | What it shows |
|---|---|
| `hello` | The smallest app: a manifest and an ES module, the context of the plugin and the event bus. |
| `notes` | Java code: an entity, a migration, a REST API, an app and actions for assistants. |
| `activities` | An app with a table under row-level security, a data contract view, the extension point `activities.detail` and actions for assistants. |
| `estimates` | An extension of Activities: a field in its own table, a widget in `activities.detail`, events on the bus, no foreign key. |
| `react` | An app written with React, bundled with Vite into one module; it declares the point `palette.preview`. |
| `vue` | An extension written with Vue: a swatch in `palette.preview` that follows the selection of the React app. |
| `todo` | An app without a backend, whose items are documents that the kernel keeps for each organization. |
| `theme` | A theme plugin: the Green theme, offered in the settings of each person. |

## Build and test

Java 25, Maven and Node.js 24. Until the first release of Mosaikit the samples use its latest
snapshot:

```bash
npm run use-mosaikit latest   # the dependencies on Mosaikit (once, and to move to a newer snapshot)
npm install
mvn package                   # notes, activities, estimates
npm run build                 # react, vue
npm test                      # every sample on one bench: about 40 seconds
npm run dev                   # Mosaikit with every sample, until Ctrl+C
```

`npm test` starts Mosaikit with all the samples on an embedded PostgreSQL, with an organization
and two people (`@mosaikit/testing`), and runs `*/tests/*.spec.ts`. To try the samples against a
change of Mosaikit that is not published yet:

```bash
npm run use-mosaikit -- --local ../mosaikit   # packs the SDK of a checkout into .mosaikit/
MOSAIKIT_INSTALLATION=../mosaikit/target/dist/mosaikit npm test
```

`npm run package` writes the packages of every sample to `packages/`.

## Licence

[MPL-2.0](LICENSE).
