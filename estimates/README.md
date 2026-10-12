# Estimates (sample extension plugin)

Extends the [Activities](../activities/README.md) app on the three levels of MK-020,
without a foreign key between the two schemas and without changing Activities:

| Level | How |
|---|---|
| Data | the table `estimate` of its own schema, keyed by the activity identifier; the activities come from the view `p_sample_activities.activity_v1`, the data contract of Activities |
| Interface | the widget `mk-activity-estimate`, contributed to the `activities.detail` point |
| Behaviour | the event `estimates.changed`, which Activities uses for its total, and `activities.completed`, which locks the widget |

It declares `requires: dev.mosaikit.sample.activities`, so the kernel migrates Activities first
and refuses Estimates when Activities is missing.

## Build and test

A project of its own: Java 25, Maven and Node.js 24, nothing else. Its POM names the parent of
Mosaikit plugins, `io.github.mosaikit:mosaikit-plugin-parent`.

```bash
mvn package    # target/<name>-<version>.zip, the package to install
mvn verify     # also the tests of tests/, on a Mosaikit installation started for them
npm test       # the same tests, after mvn package
npm run dev    # Mosaikit with this plugin, until Ctrl+C
```

The tests also install the sample `activities`: build it first (`cd ../activities && mvn package`).
