import { useDispatch, useSelector } from 'react-redux'

import { decrement, increment } from './features/counter/counterSlice'
import { RootState } from './store'

function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Vite + React + Tailwind</h1>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  )
}

export default App
