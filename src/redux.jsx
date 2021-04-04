import React, {useState, useContext, useEffect} from 'react'
export const appContext = React.createContext(null)

export const createStore = (initState, reducer) => {
  store.state = initState
  store.reducer = reducer
  return store
}

const store = {
  state: undefined,
  setState(newState) {
    store.state = newState
    store.listener.map(fn => fn()) //setStore的时候通知订阅者
  },
  reducer: undefined,
  listener: [],
  subscribe: (fn) => {
    store.listener.push(fn)
  }
}

export const connect = (Component) => {
  return (props) => {
    const {state, setState} = useContext(appContext)
    const [, update] = useState({})
    useEffect(() => {
      store.subscribe(() => {
        update({})
      })  
    }, [])
    const dispatch = (action) => {
      setState(store.reducer(state, action))
      // update({})
    }
    return <Component {...props} state={state} dispatch={dispatch} />
  }
}
