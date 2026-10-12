# Mosaikit samples

The sample plugins of [Mosaikit](https://github.com/mosaikit/mosaikit): the examples of its
[plugin development guide](https://github.com/mosaikit/mosaikit/blob/main/docs/development/plugin-development.md).
Each directory is a project of its own, built and tested only against what Mosaikit publishes, as
a plugin of a third party is (ADR-0035): its `pom.xml` names the parent of Mosaikit plugins,
`io.github.mosaikit:mosaikit-plugin-parent`, and its `package.json` the test bench,
`@mosaikit/testing`.

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
| `teams` | The app Teams: channels, posts, threads, mentions, reactions, and tabs that other plugins add. |
| `chat` | The app Chat: chats one to one and in groups, with cards of other plugins. |

## Build and test a sample

Java 25, Maven and Node.js 24. From the directory of the sample:

```bash
mvn package    # target/<name>-<version>.zip, the package to install
mvn verify     # also its tests, on a Mosaikit installation started for them
npm test       # the same tests, after mvn package
npm run dev    # Mosaikit with the sample, until Ctrl+C
```

Some tests install a neighbour, which must be packaged first: `estimates` needs `activities`,
`react` and `vue` need each other, `teams` and `chat` need `todo`.

Until the first release of Mosaikit, the samples follow its latest snapshot: the plugin API and
the parent POM come from a build of Mosaikit (`mvn install` in its repository), the npm packages
from its pre-release `snapshot`. To test against a build of Mosaikit, set
`MOSAIKIT_INSTALLATION=<mosaikit>/target/dist/mosaikit`.

## Licence

[MPL-2.0](LICENSE).
