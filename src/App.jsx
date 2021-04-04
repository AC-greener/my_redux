import React, {useState, useContext} from 'react'
import './App.css'

const createNewState = (state, actionType, actionData) => {
  if(actionType === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...actionData
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
    const newState = createNewState(appState, 'updateUser', {name: e.target.value})
    setAppState(newState)
  }
  return (
      <div>
        <input value={appState.user.name} onChange={onChange}/>
      </div>
  )
}

export default App