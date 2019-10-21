# knight vs ork
A turn based board game where a brave knight faces a dreadful ork.

![board pic](https://user-images.githubusercontent.com/23559053/67214229-a6233700-f41f-11e9-8c93-d5ec8b8e2fa1.png)

## Getting Started
This code is using ES6 modules.

### Prerequisites
To be able to run the game locally, you need to install :

- [nmp](https://docs.npmjs.com/cli/install) to install http-server module.
- [http-server](https://www.npmjs.com/package/http-server) to be able to serve files locally and don't get error due to [CORS policy.](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS)

### Launch the game
To launch the game:

- first run `http server` in your CLI.
<<<<<<< HEAD
- then open `knightvsork.html` in your browser.
=======
- then open `knighvsork.html` in your browser.
>>>>>>> 7ce88a505eddb793054374819274455ad1661011

## Documentation
You can generate full documentation thanks to [ESDoc](https://www.npmjs.com/package/esdoc).

- First, install [ESDoc](https://www.npmjs.com/package/esdoc) module.
- You can add the ESDoc command to your scripts in package.json file:
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "docs": "./node_modules/.bin/esdoc"
  },
```
- Generate the documentation with `npm run docs` in your CLI.
- Open document like this: `open docs/index.html`.