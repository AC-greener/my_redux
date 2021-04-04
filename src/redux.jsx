import React, {useState, useContext, useEffect} from 'react'
export const appContext = React.createContext(null)

const reducer = (state, {type, payload}) => {
  if(type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}

export const store = {
  state: {
    user: { name: 'zhangsan', age: 18 }
  },
  setState(newState) {
    store.state = newState
    store.listener.map(fn => fn()) //setStore的时候通知订阅者
  },
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
      setState(reducer(state, action))
      // update({})
    }
    return <Component {...props} state={state} dispatch={dispatch} ></Component>
  }
}
