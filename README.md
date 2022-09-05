# SH

This repository contains all the applications and libraries SH uses.

## Mono-repository

For managing all the subprojects we are using [Turborepo](https://turborepo.org). Below there is a list of the shared
packages our application uses, and a brief description of what applications exist.

### Applications

- `admin`: a [Next.js](https://nextjs.org) app that will act as an ERP for SH admin users.
- `client`: a [Next.js](https://nextjs.org) app that will replace the Wordpress frontend and act as a new frontend to the users.

### Packages

- `components`: the component library for the new marketplace.
- `api`: a set of functions and utilities to manage data and request to Laravel backend.
- `eslint-config-custom`: a shared ESLint configuration for all application.
- `tsconfig`: a shared TS configuration for all projects.

## Commands

All commands should be run from the root of the repository. They can be found in the root `package.json`.

### `npm run dev`

This command is used to start the development of all main applications. Basically Turborepo runs `npm run dev` in all
packages and applications defined in the `workspaces` field of the `package.json`.

Some libraries, like the component library, need to be built for other applications to be able to use them. This happens
automatically when `npm run dev` is run.

### `npm run format`

Runs Prettier across all packages and apps using the configuration specified in the root `package.json`

### `npm run clean`

Clean all output folders, Turborepo caches and `node_modules` from all subprojects.

## FAQ

### How do I install the packages?

To install the packages, the following command should be run from the root of the repository:

```bash
npm install package-name -w workspace-name
```

Where `package-name` is the name of the package and `workspace-name` is the name of the workspace.
The workspace name can be found in each library and application `package.json`.

For example, if I want to install `react` in the components library I would do:

```bash
npm install react -w @sh/admin
```

Unless you are doing something for all repository like installing Prettier or configuring ESLint you should not install
packages in the root `package.json`

### How do I create new packages and applications?

At the moment of writing this (2022-08-19), there is no way to create new packages and applications automatically using
the Turborepo CLI. However, it is possible to create new packages and applications manually.

To do this you need to create the app or copy and paste the package as usual but cancel the installation step. Only
one `package-lock.json` should exist in the whole project and that must be the one at the root of the project.

If you more than one `package-lock.json` besides the one at the root, you should delete it and run `npm install` again
from the root.

### How do I install a local package in an application?

To accomplish this you just need to include the package in the application `package.json` like this:

```json
{
  "dependencies": {
    "@sh/your-package": "*"
  }
}
```

### How to deploy a new application to Vercel?

To do this properly I recommend copying a current app configuration.
Also, it is really important to configure the proper environment variables.

## Troubleshooting

### Conflicting react versions when installing

Is it possible that some packages, especially old ones, are using `react` versions that are not compatible with the
current `react` versions of the project. All React.js versions should be upgraded together preferably to the latest.

### "Cannot find module `http2`" (or some variation)

This is also caused by the fact that some library is not properly configured to
be [tree shakeable](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking).

What is happening here is that some Node.js module is being imported to the frontend. This happens because the frontend
is importing the whole package instead of only the specific things being imported.

### Some libraries are acting weird

Sometimes the installed libraries get cached incorrectly. To solve this simply run `npm run clean` from the root
and `npm install` again.

### Next.js does not detect my library or crashes

When setting up new packages we must instruct Next.js to include this library in the building process. For this we
should add the library name to the [`next-transpile-modules`](https://www.npmjs.com/package/next-transpile-modules)
plugin in the application `next.config.js`. The following is an example of how to add `@sh/example` to a Next.js
application:

```js
const withTM = require('next-transpile-modules')(['@sh/example']);

module.exports = withTM({});
```
