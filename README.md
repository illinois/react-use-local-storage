# react-use-local-storage

React hook that persists state with the [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API. It also automatically syncs state between tabs/windows.

## Getting started

```
npm i @illinois/react-use-local-storage
```

This hook functions similarly to `useState`, with the exception of the the caveats listed below. If your state is easily encodable in JSON and you don't use lazy initialization or functional updates, it should be easy to migrate from `useState`. You'll need to provide a key for getting/setting the item in local storage.

```jsx
import useLocalStorage from '@illinois/react-use-local-storage'

const MyComponent = () => {
  const [count, setCount] = useLocalStorage('value-key', 0)
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  )
}
```

## Trying it out

```sh
git clone https://github.com/illinois/react-use-local-storage.git react-use-local-storage
cd react-use-local-storage
npm install
npm run storybook
```

This will launch a simple demo with a counter that can be incremented and reset. Try opening the demo in two tabs at once and watch how changes are automatically synced between them!

## Caveats/Warnings

* State is serialized with `JSON.stringify` and deserialized with `JSON.parse`. This is done because the `localStorage` API doesn't support storing anything but strings at present. As such, you should pay special attention to objects that might not handle being round-tripped through JSON, e.g. a `Date` object.

* Unlike `useState`, [lazy initialization](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state) is not currently supported. A PR adding support would be welcome!

* Unlike `useState`, [functional updates](https://reactjs.org/docs/hooks-reference.html#functional-updates) are not currently supported. A PR adding support would be welcome!

## Prior art

* https://github.com/streamich/react-use/blob/master/docs/useLocalStorage.md
* https://github.com/rehooks/local-storage/blob/master/index.js
