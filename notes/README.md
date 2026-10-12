# Notes (sample Java extension)

Shows what an extension with Java code looks like (MK-011):

| Path | Content |
|---|---|
| `manifest.yaml` | Declares the JAR (`backend.jar`) and the database schema `ext_sample_notes` |
| `pom.xml`, `src/` | The Java code: entity, Jakarta Data repository, REST resource under `/api/v1/ext/sample-notes` |
| `web/` | The Notes app: a Web Component that calls the extension API with `context.fetch` |
| `db/` | Flyway migrations of the extension schema, run by the kernel at start |
| `lib/sample-notes.jar` | Built by `mvn package`; not versioned |
| `target/sample-notes-<version>.zip` | The package to install, built by `mvn package` |

To install it, copy `target/sample-notes-<version>.zip` into the
`extensions/` directory of an installation as it is, and start it with the `mosaikit` launcher: the
launcher rebuilds the kernel with the extension code. After sign-in, **Notes** appears in the menu of
apps.

```bash
curl -u admin:<password> -H 'Content-Type: application/json' \
     -d '{"text":"Hello"}' http://localhost:8080/api/v1/ext/sample-notes/notes
curl -u admin:<password> http://localhost:8080/api/v1/ext/sample-notes/notes
```

## Build and test

A project of its own: Java 25, Maven and Node.js 24, nothing else. Its POM names the parent of
Mosaikit extensions, `io.github.mosaikit:mosaikit-extension-parent`.

```bash
mvn package    # target/<name>-<version>.zip, the package to install
mvn verify     # also the tests of tests/, on a Mosaikit installation started for them
npm test       # the same tests, after mvn package
npm run dev    # Mosaikit with this extension, until Ctrl+C
```
