# ist-cg

The project repository for the CG course at Técnico.

## Setup

All that's needed is NodeJS to be able to install the dependencies and run the commands. First install the dependencies with:

```
npm install
```

This will install the dependencies in the `node_modules/` folder. After this step is done you're ready to start building, run the following command to start the environment:

```
npm run dev
```

This will build the `src/` files and start a live reload session at `http://localhost:10001`. Every save you make, on the source files will trigger a build and the page will reload automatically.

There is also another command to simply build the source files:

```
npm run build
```

# Contributing

To make things easy we'll use GitHub as the source of all our project knowledge. We will submit code through Pull Requests and the branch naming convention should be:

```
[type]/[user]_[issue #]_[context]
```

- `[type]`: can be wither `feature` or `fix`;
- `[user]`: is the author's user name;
- `[issue #]`: is the issue number, to which this branch is related (if the isn't one, don't double dash `__`);
- `[context]`: human readable information that gives context on what is included, e.g. `objects-oranges`.
