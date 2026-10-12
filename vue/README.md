# Swatch (Vue sample)

An extension frontend written with Vue (MK-021), bundled with Vite into `dist/index.js` with Vue
inside. It contributes the `mk-sample-swatch` element to the `palette.preview` point of the
[React sample](../react) and follows the colour that it publishes on `palette.selected`:
two frameworks in the same page, talking only through the event bus of the shell.

## Build and test

A project of its own: Java 25, Maven and Node.js 24, nothing else. Its POM names the parent of
Mosaikit extensions, `io.github.mosaikit:mosaikit-extension-parent`.

```bash
mvn package    # target/<name>-<version>.zip, the package to install
mvn verify     # also the tests of tests/, on a Mosaikit installation started for them
npm test       # the same tests, after mvn package
npm run dev    # Mosaikit with this extension, until Ctrl+C
```

The tests also install the sample `react`: build it first (`cd ../react && mvn package`).
