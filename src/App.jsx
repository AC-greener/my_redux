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

const A = () => <section>A组件<User/></section>
const B = () => <section>B组件<UserModifier/></section>
const C = () => <section>C组件</section>

const User = () => {
  const {appState} = useContext(appContext)
  return <div>用户:{appState.user.name}</div>
}

const UserModifier = () => {
  const {appState, setAppState} = useContext(appContext)

  const onChange = (e) => {
    const newState = reducer(appState, {type: 'updateUser', payload: {name: e.target.value}})
    setAppState(newState)
  }
  return (
      <div>
        <input value={appState.user.name} onChange={onChange}/>
      </div>
  )
}

export default App