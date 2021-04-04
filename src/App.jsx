import React, {useState, useContext, useEffect} from 'react'
import './App.css'
import { createStore, connect, Provider} from './redux.jsx'

const reducer = (state, {type, payload}) => {
  if(type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else if(type === 'updateBook') {
    return {
      ...state,
      book: {
        ...state.book,
        ...payload
      }
    }
  } else {
    return state
  }
}
const initState = {
  user: { name: 'zhangsan', age: 18 },
  book: {
    name: 'JS高级程序设计'
  },
  movie: []
}
const store = createStore(initState, reducer)
 const App = () => {

  return (
    <Provider store={store}>
      <A/>
      <B/>
      <C/>
      <BookWrapper />
    </Provider>
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

const User = ({user}) => {
  console.log('User 执行了',  Math.random())
  
  return <div>用户:{user.name}</div>
}
const ajax = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({data: '哈哈哈'})
    }, 3000)
  })
}

function fetchuser(updateUser) {
  ajax('/api').then(res => {
    updateUser({type: 'updateUser', payload: {name: res.data}})
  })
}


const UserModifier = ({user, dispatch, children}) => {
  //实现dispatch(fetchUser)
  // let preDispatch = dispatch
  // var dispatch =(fn) => {
  //   fn(preDispatch)
  // } 
  const onChange = (e) => {
    // fetchuser(dispatch)
    dispatch(fetchuser) //fetchUser是一个函数action
  }
  console.log('UserModifier 执行了', Math.random())
  return (
      <div>
        {children}
        <button onClick={onChange}>获取user</button>
      </div>
  )
}

const Book = ({book, dispatch}) => {
  console.log(dispatch)
  console.log('book执行了')
  return (
    <div>
      Book 组件
      <input value={book.name} onChange={(e) => {
        dispatch({type: 'updateBook', payload: {name: e.target.value}})
      }}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (payload) => dispatch({type: 'updateUser', payload}),
  }
}
const UserModifierWrapper = connect(mapStateToProps, null)(UserModifier) 
const UserWrapper = connect(mapStateToProps)(User)

const BookWrapper = connect((state) => {
  return {
    book: state.book
  }
})(Book)

export default App