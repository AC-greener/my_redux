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
    return () => {
      console.log('remove listener')
      const index = store.listener.indexOf(fn)
      store.listener.splice(index, 1)
    }
  }
}
const changed = (oldState, newState) => {
  let changed = false
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true
    }
  }
  return changed
}

export const connect = (selector) => (Component) => {
  return (props) => {
    const {state, setState} = useContext(appContext)
    const [, update] = useState({})
    const data = selector ? selector(state) : state
    useEffect(() => {
      return store.subscribe(() => {
        const newData =  selector ? selector(store.state) : store.state
        console.log(changed(data, newData))
        if(changed(data, newData)) {
          update({})
        }
      })  
    }, [])
    const dispatch = (action) => {
      setState(store.reducer(state, action))
    }
    return <Component {...props} state={data} dispatch={dispatch} />
  }
}
export const Provider = ({store, children}) => {
  return (
    <appContext.Provider value={store}>
      {children}
    </appContext.Provider>
  )
}