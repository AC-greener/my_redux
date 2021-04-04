import React, {useState, useContext, useEffect} from 'react'
export const appContext = React.createContext(null)

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
      const index = store.listener.indexOf(fn)
      store.listener.splice(index, 1)
    }
  }
}

export const createStore = (initState, reducer) => {
  store.state = initState
  store.reducer = reducer
  return store
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

//connect 先调用一次得到一个半成品
export const connect = (mapStateToProps, mapDispatchToProps) => (Component) => {
  return (props) => {
    const {state, setState} = useContext(appContext)
    let dispatch = (action) => {
      setState(store.reducer(state, action))
    }
    const prevDispatch = dispatch  //preDispatch只处理对象
    dispatch = (action) => {
      if(typeof action === 'function') {
        action(dispatch)
      } else {
        prevDispatch(action)
      }
    }

    const [, update] = useState({})
    const data = mapStateToProps ? mapStateToProps(state) : {state}
    const dispatchers = mapDispatchToProps ? mapDispatchToProps(dispatch) : {dispatch}
    useEffect(() => {
      return store.subscribe(() => {
        const newData =  mapStateToProps ? mapStateToProps(store.state) : store.state
        if(changed(data, newData)) {
          update({})
        }
      })  
    }, [])

    return <Component {...props} {...data} {...dispatchers} />
  }
}
export const Provider = ({store, children}) => {
  return (
    <appContext.Provider value={store}>
      {children}
    </appContext.Provider>
  )
}