# hello

## Build and test

A project of its own: Java 25, Maven and Node.js 24, nothing else. Its POM names the parent of
Mosaikit extensions, `io.github.mosaikit:mosaikit-extension-parent`.

```bash
mvn package    # target/<name>-<version>.zip, the package to install
mvn verify     # also the tests of tests/, on a Mosaikit installation started for them
npm test       # the same tests, after mvn package
npm run dev    # Mosaikit with this extension, until Ctrl+C
```
