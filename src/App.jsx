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
const B = () => <section>B组件<UserModifierWrapper x={'xxxxx'}/>内容</section>
const C = () => <section>C组件</section>

const User = ({state}) => {
  return <div>用户:{state.user.name}</div>
}

const connect = (Component) => {
  return (props) => {
    const {appState, setAppState} = useContext(appContext)
    const dispatch = (action) => {
      setAppState(reducer(appState, action))
    }
    return <Component {...props} state={appState} dispatch={dispatch} />
  }
}



const UserModifier = ({state, dispatch, children}) => {
  const onChange = (e) => {
    dispatch({type: 'updateUser', payload: {name: e.target.value}})
  }
  return (
      <div>
        {children}
        <input value={state.user.name} onChange={onChange}/>
      </div>
  )
}

const UserModifierWrapper = connect(UserModifier)
const UserWrapper = connect(User)

export default App