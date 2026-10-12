# Palette (React sample)

An extension frontend written with React (MK-021). `npm run build` (run by the Maven build through the
npm workspaces) bundles it with Vite into one ES module, `dist/index.js`, with React inside: the
framework is private to the extension, and the shell imports the module like any other frontend.

It picks a colour, publishes `palette.selected` on the bus and shows the previews that other
extensions contribute to its `palette.preview` point, such as the [Vue sample](../vue).

## Build and test

A project of its own: Java 25, Maven and Node.js 24, nothing else. Its POM names the parent of
Mosaikit extensions, `io.github.mosaikit:mosaikit-extension-parent`.

```bash
mvn package    # target/<name>-<version>.zip, the package to install
mvn verify     # also the tests of tests/, on a Mosaikit installation started for them
npm test       # the same tests, after mvn package
npm run dev    # Mosaikit with this extension, until Ctrl+C
```

The tests also install the sample `vue`: build it first (`cd ../vue && mvn package`).
