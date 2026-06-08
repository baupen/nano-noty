# Nano Noty

> !notice
> This is a maintained fork of the original noty library. Only the features specific to showing notifications remain.

**NOTY** is a notification library that makes it easy to create **alert** - **success** - **error** - **warning** - **information** - **confirmation** messages as an alternative the standard alert dialog.

---

## Features

- [x] Dependency-free
- [x] Progress bar indicator for timed notifications
- [x] Supports css animations
- [x] Custom themes


##### Basic Usage

```js
import Noty from "noty";

new Noty({
  text: "Notification text"
}).show();

// or

const Noty = require("noty");

new Noty({
  text: "Notification text"
}).show();
```

##### Development

```console
$ npm run dev
$ npm run build
```

##### Development environment

- [x] Standard
- [x] Prettier
- [x] ES6 & Babel & Webpack
- [x] Sass
- [x] Autoprefixer
- [x] QUnit
- [x] BrowserStack
- [x] Pre-commit tests

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
