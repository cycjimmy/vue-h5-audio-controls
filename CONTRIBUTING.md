# Contributing

The repository is released under the MIT license, and follows a standard Github development process, using Github tracker for issues and merging pull requests into main.

## Requirements

* Node.js `^22.22.2 || ^24.15.0 || >=26.0.0`, the same range as `engines` in `package.json` (CI runs the test matrix on the newest 22 and 24 patch releases, which is what `actions/setup-node` installs). The lower bound comes from `jsdom` and `stylelint`.
* npm 10+

## Development

```shell
$ npm install          # install the toolchain
$ npm run dev          # Vite dev server with the root index.html
$ npm run type-check   # vue-tsc over the SFCs and the shipped types
$ npm run lint         # ESLint (flat config, @antfu/eslint-config)
$ npm run lint:style   # Stylelint for the <style> blocks in src/**/*.vue
$ npm test             # Vitest with jsdom
$ npm run package      # build dist/ and assemble .release/
```

`index.html` in the repository root is the Vite dev entry and imports `src/` directly; it is a thin harness with one button per public method and is never deployed.

`static/index.html` is the GitHub Pages demo: it loads the bundled `h5-audio-controls.umd.js` through a `<script>` tag and is deployed by `npm run build:deployment`. Keep the two separate: the demo exercises the built UMD bundle, the dev entry exercises the sources.

## Build outputs

`npm run build` writes three files into `dist/`:

| File | Format | Purpose |
| --- | --- | --- |
| `h5-audio-controls.esm.js` | ESM | `main`, `module` and `exports` entry (bundlers, `import`) |
| `h5-audio-controls.umd.js` | UMD | unminified browser build, used by the GitHub Pages demo |
| `h5-audio-controls.umd.min.js` | UMD | minified browser/CDN build, attached to the GitHub release |

There is no CommonJS build. `vue` is the only external of both formats, so the UMD files expect the global `Vue` object and the ESM file expects `vue` to be resolvable by the consumer.

`npm run build:deployment` builds the UMD bundle and copies `static/`, the bundle and the Vue global build from `node_modules` into `.publish/`, which the `Deploy To GitHub Pages` workflow uploads as a Pages artifact and publishes with `actions/deploy-pages`. The demo is self-contained on purpose: no third-party script is executed on the Pages origin.

## Repository settings required by the deployment

The Pages deployment cannot be fully expressed in code, so the switch itself lives in the repository settings:

1. **Settings → Pages → Build and deployment → Source**: select **GitHub Actions**. With *Deploy from a branch* selected, `actions/deploy-pages` refuses to run, because no Pages site is served from the artifact flow.
2. The `gh-pages` branch and the `ACCESS_TOKEN` secret are no longer used: the site is uploaded as an artifact and published with the workflow's own OIDC token, so no stored credential is involved. Both can be removed once the first deployment from `main` has succeeded.

## Repository settings required by the bots

`.github/workflows/dependabotAutoMerge.yml` merges non-major Dependabot pull requests automatically. Three settings cannot be expressed in code and must be enabled by a maintainer:

1. **Settings → Actions → General → Workflow permissions**: choose *Read and write permissions*. Dependabot opens its pull requests from branches inside this repository, which is why the `pull_request` event can hand `GITHUB_TOKEN` a write token there. Pull requests from forks stay read-only, and the workflow skips them through the `head.repo.full_name` guard.
2. **Settings → General**: enable *Allow auto-merge*.
3. **Branch protection on `main`**: block force pushes and deletions, but leave *Require status checks to pass before merging* **off**. `semantic-release` pushes `chore(release): … [skip ci]` straight to `main`, and GitHub rejects that push while a required check is configured. A repository owned by a personal account cannot add the GitHub Actions app to a ruleset bypass list either, so there is no way to have both.

The CI gate for Dependabot lives in `dependabotAutoMerge.yml` instead: it polls `gh pr checks` for the expected check names, squash merges only after they pass, and confirms the pull request reached `MERGED` before it asks for the Pages deployment. `Test CI` reports one check per matrix cell (`test (22, ubuntu-latest)` and so on), so the `test-status` job aggregates them into a single `Test CI Summary` check that is easy to read.

`Test CI` keeps the write token away from the steps that execute repository code: the `test` job is read-only, and the semantic-release dry-run lives in its own `release-dry-run` job gated to trusted branches.

A `pull_request` run uses the workflow definition of the base branch, so a branch that changes the toolchain cannot be validated through its pull request. Run `gh workflow run "Test CI" --ref <branch>` to execute the definition of the branch itself.

If write permissions cannot be granted to `pull_request` runs at all, switch the trigger of `dependabotAutoMerge.yml` to `pull_request_target`. `dependabot/fetch-metadata` never checks out the pull request code, so the elevated token stays out of the fork's reach.

Publishing to npm uses OIDC trusted publishing. The trusted publisher entry on npmjs.com must name this repository and the `release.yml` workflow filename; no `NPM_TOKEN` secret is read. The same workflow publishes the tarball to the GitHub Package Registry with `GITHUB_TOKEN`.

## Labels

The triage bot and the issue forms reference labels that have to exist in the repository. `issues.addLabels` fails with `422` for unknown labels, so keep this list in sync when a rule changes:

| Label | Used by |
| --- | --- |
| `bug` | `bug_report.yml` form |
| `enhancement` | `feature_request.yml` form |
| `needs-info` | triage rule 3, plus the 7-day lifecycle in `stale.yml` |
| `publish-auth` | triage rule 1 (npm / GPR publishing failures) |
| `usage` | triage rule 2 (questions about using the component) |
| `triaged` | manual exemption from the half-year staleness in `stale.yml` |
| `stale` | applied and removed by `actions/stale` |
| `ci` | `dependabot.yml` github-actions group |
| `dependencies` | `dependabot.yml` both ecosystems |

## Commits

[Conventional Commits](https://www.conventionalcommits.org/) are required: `semantic-release` derives the version and the changelog from them. A breaking change must be marked with `!` and a `BREAKING CHANGE:` footer. Commit subjects and bodies, pull request titles and bodies, and issue comments are written in English.
