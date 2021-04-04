import React, {useState, useContext} from 'react'
import './App.css'

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

const appContext = React.createContext(null)

 const App = () => {
  const [appState, setAppState] = useState({
    user: { name: 'zhangsan', age: 18 }
  })
  return (
    <appContext.Provider value={{appState, setAppState}}>
      <A/>
      <B/>
      <C/>
    </appContext.Provider>
  )
}

const A = () => <section>A组件<UserWrapper/></section>
const B = () => <section>B组件<UserModifierWrapper/></section>
const C = () => <section>C组件</section>

const User = ({state}) => {
  return <div>用户:{state.user.name}</div>
}

const createWrapper = (Component) => {
  const Wrapper = () => {
    const {appState, setAppState} = useContext(appContext)
    const dispatch = (action) => {
      setAppState(reducer(appState, action))
    }
    return <Component state={appState} dispatch={dispatch} />
  }
  return Wrapper
}



const UserModifier = ({state, dispatch}) => {
  const onChange = (e) => {
    dispatch({type: 'updateUser', payload: {name: e.target.value}})
  }
  return (
      <div>
        <input value={state.user.name} onChange={onChange}/>
      </div>
  )
}

const UserModifierWrapper = createWrapper(UserModifier)
const UserWrapper = createWrapper(User)

export default App