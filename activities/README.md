# Activities (sample app plugin)

The test app of the prototype (MK-020): a plain app that other plugins extend, with nothing
specific to a domain.

| Path | Content |
|---|---|
| `manifest.yaml` | Backend, schema `p_sample_activities`, the extension point `activities.detail`, three actions for assistants |
| `db/` | The table `activity` under row-level security and its data contract, the view `activity_v1` |
| `src/` | Entity, Jakarta Data repository and REST resource under `/api/v1/p/sample-activities` |
| `web/` | The Activities app; it shows the widgets contributed to `activities.detail` with each activity |

The [Estimates](../estimates/README.md) plugin extends it with a field, a widget and an
event, without a foreign key and without code of Activities knowing about it.

## Build and test

A project of its own: Java 25, Maven and Node.js 24, nothing else. Its POM names the parent of
Mosaikit plugins, `io.github.mosaikit:mosaikit-plugin-parent`.

```bash
mvn package    # target/<name>-<version>.zip, the package to install
mvn verify     # also the tests of tests/, on a Mosaikit installation started for them
npm test       # the same tests, after mvn package
npm run dev    # Mosaikit with this plugin, until Ctrl+C
```
