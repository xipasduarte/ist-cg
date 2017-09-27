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

## Development

We are using some of the latest features in JavaScript, most notably the module composition. Essentially all files (except the `app.js`) are to be considered modules. Each of these returns some new Object or does something with the Objects. A file structure always contains an `export default` like this:

```javascript
export default () => {
  // Contents of the function.
}
```

You can import things to use on other files with the `import` instruction. For ThreeJS this means that each of the methods that were under the `THREE` object, can now be imported separately like this:

```javascript
import { TorusGeometry, MeshBasicMaterial, Mesh } from 'three';

export default () => {
  const geometry = new TorusGeometry(2, 1); // Previously THREE.TorusGeometry()
  const material = new MeshBasicMaterial({ color: 0xffff00, wireframe: true }); // Previously THREE.MeshBasicMaterial()
  const cheeerio = new Mesh(geometry, material); // Previously THREE.Mesh()

  return cheerio;
}
```

You can also import files from the current directory (ThreeJS is a dependency). To do so reference the file and name the exported function like the file (minus the `.js`):

```javascript
import { Scene } from 'three';
import Wheel from './Objects/Wheel';

export default () => {
  const scene = new Scene(); // Previously THREE.Scene()

  scene.add(Wheel());

  return scene; // This is just an example, in reality we are adding the scene variable to the window object which is of global access.
}
```

## Contributing

To make things easy we'll use GitHub as the source of all our project knowledge. We will submit code through Pull Requests and the branch naming convention should be:

```
[type]/[user]_[issue #]_[context]
```

- `[type]`: can be wither `feature` or `fix`;
- `[user]`: is the author's user name;
- `[issue #]`: is the issue number, to which this branch is related (if the isn't one, don't double dash `__`);
- `[context]`: human readable information that gives context on what is included, e.g. `objects-oranges`.
