# Green theme (sample)

A theme extension ([MK-028](https://github.com/mosaikit/mosaikit/blob/main/docs/requirements/MK-028.yaml)): a manifest of kind `theme` with the
colors of a brand for the light and dark schemes, and nothing else. Installed from the Extensions page
it is active at once: people choose **Green** in their settings, or the installation makes it the
default with `mosaikit.ui.theme=dev.mosaikit.sample.theme`.

The colors it leaves out (background, surface, text, lines, states) come from the default theme, so
a theme can set only the brand color. The shell refuses colors that are not `#rrggbb`.

## Build and test

A project of its own: Java 25, Maven and Node.js 24, nothing else. Its POM names the parent of
Mosaikit extensions, `io.github.mosaikit:mosaikit-extension-parent`.

```bash
mvn package    # target/<name>-<version>.zip, the package to install
mvn verify     # also the tests of tests/, on a Mosaikit installation started for them
npm test       # the same tests, after mvn package
npm run dev    # Mosaikit with this extension, until Ctrl+C
```
