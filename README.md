# Prelude

Fast way to create a factory, which taking care of the presence of all the necessary properties to create a final product. It's designed for creating polymorphic objects and functions, which can be constructed with different components.

```js
import lego, { PropTypes } from 'lego';

const myPolymorphicAccount = lego({
  fetch: PropTypes.function,
  storage: PropTypes.object
}, function(fetch, store) {
  return function getUser() {
    return fetch('/getUser')
    .then((res) => {
      return res.json();
    })
    .then((userData) => {
      storage.setValue('userId', userData.id);
      return userData;
    });
  }
});
```

Create a function `getUser` with real external components:
```js
import fetch from 'node-fetch';
const getUser = lego({
  fetch: fetch,
  storage: localStorage
})();
```

Create a function `getUser` with mock components
```js
import { mockLocalStorage, mockFetch } from './some-mocks';
const getUser = lego({
  fetch: mockFetch,
  storage: mockLocalStorage
})();

```

## Getting started

```shell
npm install github:morulus/lego --save
```

You should use es6 compiler like [babel](https://babeljs.io/) with es2015 preset to use it.

```js
import lego, { PropTypes } from 'lego';
```

## Half-full factory

You can create a factory with some already predefined properties. For example:

Our factory requires property `a`, `b` and `c`.
```js
const abcFactory = lego({
  a: lego.PropTypes.string,
  b: lego.PropTypes.string,
  c: lego.PropTypes.string
}, (a, b, c) => {
  return `${a} ${b} ${c}`;
});
```

We already have `a` and `c`, but we do not have `b`. We can create a factory, that requires only `b`.

```js
const abcFactoryNoB = abcFactory({
    a: 'It',
    c: 'OK'
});
```

Now `abcFactoryNoB` requires only `b`. If we will try to construct the final product, it will provides an error: `Lego factory requires props: b`. It means that it already have `a` and `c`, but do not have `b`. And we need is give it `b`.

```js
const abs = abcFactoryNoB({
  b: 'is'
})();

abs();
// It is OK
```

# Author

Vladimir Kalmykov <vladimirmorulus@gmail.com>

# license

MIT, 2016
