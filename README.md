# Migration Redirect Checker

Migration Redirect Checker helps you review the redirect map for a website rebuild. Give it your old URLs and planned destinations to find gaps, loops and chains before changing the live site.

Reports run locally. The tool does not deploy redirects or promise to preserve rankings. Maintained by [Manchester Web Design](https://manchesterwebdesign.uk/), operated by JW Digital Services Ltd.

![Complete example](docs/preview.png)

## Start locally

Requires Node.js 22 or later. No runtime dependencies or account required.

```sh
npm ci
npm test
npm run build
npm run serve
```

Open http://127.0.0.1:4173/ for the complete local demonstration. Browser examples do not upload or persist entered data. The optional development server binds to loopback only.

## Input and output

Supply sourceOrigin, targetOrigin, legacyUrls and mapping (old_url, new_url, status, reason). No URLs are fetched. Paths and query strings remain significant; fragments identify the same server resource.

Use [examples/input.json](examples/input.json) as the complete input contract. Compare the generated [JSON result](examples/output.json), [Markdown report](examples/output.md) and [complete HTML](examples/output.html). The demo is in [demo/index.html](demo/index.html). It needs the local server for JavaScript modules. HTML reports can be opened as standalone files.

```sh
node cli.mjs examples/input.json --format json
node cli.mjs examples/input.json --format html --output report.html
node cli.mjs examples/input.json --format md --output report.md
```

Flat collections can also be imported with `--csv data.csv --context context.json --key items` (replace `items` with the documented collection). Nested structures use JSON. See `node cli.mjs --help`.

## Worked example

Use a fictional supplier site with six old URLs. Include `/services-old` mapping directly to `/capabilities`, a two-hop `/team` chain, an `/about` loop, a missing `/downloads` destination, a query-preservation example and a legitimately retired page recorded for review. The expected report identifies each condition separately rather than inventing a single SEO score.

All supplied example records are synthetic. No clients, outcomes, current professional advice or real service availability are represented by them. Keep real records private and review output before sharing it.

## Checks

- A clean mapping produces no structural errors; an unmapped URL remains visible as a decision to make.
- Multi-hop chains and loops are found without infinite traversal. Duplicate rows with different targets fail clearly.
- Protocol, host, case and query policy are tested; encoded separators are not silently normalised into another route.
- The HTML report escapes supplied values. Offline mode performs no network requests, and any verifier rejects private-network targets and unapproved origins.
- A new user can run the supplied example using the documented command and get the expected report.

The automated results and browser checks performed for this release are recorded in [verification.md](docs/verification.md). Manual screen-reader testing has not been performed. A passing automated check is not accessibility certification.

## Contribute and maintain

Use [Issues](https://github.com/Manchester-Web-Design/migration-redirect-checker/issues) for a reproducible bug and [Discussions](https://github.com/Manchester-Web-Design/migration-redirect-checker/discussions) for questions and improvements. Follow [CONTRIBUTING.md](CONTRIBUTING.md); report vulnerabilities privately using [SECURITY.md](SECURITY.md). See [CHANGELOG.md](CHANGELOG.md) for releases. Maintenance is best effort.

Code, original illustrations and synthetic fixtures are MIT licensed. There is no required website backlink when reusing the resource. Commercial brand assets and third-party material are not included.

## CSV example

```sh
node cli.mjs --csv examples/input.csv --context examples/context.json --key mapping --format html --output csv-report.html
```

The context holds the root settings; the CSV holds the flat collection. Explicit booleans use `true` or `false`. Nested data uses JSON.
