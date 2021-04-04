import React, {useState, useContext, useEffect} from 'react'
import './App.css'
import {store, connect, appContext} from './redux.jsx'

 const App = () => {

  return (
    <appContext.Provider value={store}>
      <A/>
      <B/>
      <C/>
    </appContext.Provider>
  )
}

const A = () => {
  console.log('A 执行了', Math.random())
  return <section>A组件<UserWrapper/></section>
}
const B = () => {
  console.log('B 执行了', Math.random())
  return <section>B组件<UserModifierWrapper x={'xxxxx'}/>内容</section>
}
const C = () => {
console.log('C 执行了', Math.random())
 return <section>C组件</section>
}

const User = ({state}) => {
  console.log('User 执行了',  Math.random())
  return <div>用户:{state.user.name}</div>
}


const UserModifier = ({state, dispatch, children}) => {
  const onChange = (e) => {
    dispatch({type: 'updateUser', payload: {name: e.target.value}})
  }
  console.log('UserModifier 执行了', Math.random()  )
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