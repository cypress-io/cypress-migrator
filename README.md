# CypressMigrator

CypressMigrator is a monorepo for DX team migration shippable applications and libraries. This project was generated using [Nx](https://nx.dev).

---

## Migrator

An application developed to help with migration to Cypress from other frameworks.

If you think there is an issue with a migrated item, please file an issue in the Cypress Codemods repo [here](https://github.com/cypress-io/cypress-codemods/issues/new).
<br /><br />

# NX Workspace

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins from [https://nx.dev/l/a/cli/generate](https://nx.dev/l/a/cli/generate) to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins from [https://nx.dev/l/a/cli/generate](https://nx.dev/l/a/cli/generate) to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@cypress-dx/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app-e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
