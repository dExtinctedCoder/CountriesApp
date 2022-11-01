import React, { createContext, useReducer, useState } from 'react'
import Main from './Main'
import Query from './Query'

export const countryContext = createContext()

const initState = {
  countryName: '', 
  isTyping: false
}

const reducer = (currentState, action) => {
  switch (action.type) {

    case "is__Typing":
      return {
        ...currentState,
        countryName: action.event,
        isTyping: true
      }

    case "reset":
      return {
        ...currentState,
        isTyping: false
      }
  
    default:
      return state;
  }
}


const Home = () => {
  
  const [filter, setFilter] = useState('')
  const [countryState, dispatchAction] = useReducer(reducer, initState)

  return (
    <div>
      <countryContext.Provider value={{countryState, dispatchAction, filter, setFilter}}>
        <Query/>
        <Main />
      </countryContext.Provider>
    </div>
  )
}

export default Home