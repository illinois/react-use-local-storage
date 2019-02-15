import * as React from 'react';

import { storiesOf } from '@storybook/react';

import useLocalStorage from '../src/index'

const UseLocalStorageDemo = () => {
  const [count, setCount] = useLocalStorage('demo-count', 0)
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  )
}

storiesOf('useLocalStorage', module)
  .add('demo', () => <UseLocalStorageDemo />)
