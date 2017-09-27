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

### Git basics

These are the basic commands and their core features.

1. First you need to clone the repository (make sure you have your SSH key configured on GitHub):
```
git clone git@github.com:xipasduarte/ist-cg.git
```
This will create a folder with the repo name, if you'd like to change the folder's name, just pass on argument at the end with a string for the new name.

2. Creating a branch to work on. Always create branches, to star new development, from the master branch.
```
git checkout -b [branch_name]
```
This will create the branch and "mount" it.

3. Changing branches, or checkout in git.
```
git checkout [branch_name]
```
So basically it's the simplest use of the command in 2., here we don't pass the `-b` option and no branch is created.

4. Add changes to commit. This will put your changes in a "virtual branch" that then, on step 6., gets imprinted in the repository's history.
```
git add [name of file or folder]
```
or
```
# Allows for a preview of the changes. Does not add new files, a.k.a. untracked.
git add -p
```
or
```
# Add everything that was changed. Dangerous...
git add --all
```

5. To see which files were changed use an equivalent of the `ls` command.
```
git status
```

6. Commiting your work. Do this often, it will ease with writing messages and save states of the code, in case something goes wrong.
```
git commit -m "Write message here."
```

7. Finally, when you're ready to share your changes, or jus want to keep them in a safer place, just push them to the remote repository.
```
git push origin [branch_name]
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
