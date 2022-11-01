import React, { useContext, useEffect } from 'react'
import { useReducer } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Reusables/Loading/Loading'
import { countryContext } from './Home'


const initVal = {
  loading: true,
  data: [],
  error: '',
}

const queryParam = {
  name: 'name',
  flags: 'flags',
  region: 'region',
  capital: 'capital',
  currencies: 'currencies',
  languages: 'languages',
  population: 'population',
  subregion: 'subregion',
  topLevelDomain: 'topLevelDomain',
  callingCodes: 'callingCodes',
  timezones: 'timezones',
  nativeName: 'nativeName',
  borders: 'borders',
}

const reducer = (currentState, action) => {
  switch (action.type) {
    case "FETCH__SUCCESSFUL":
      return {
        ...currentState,
        loading: false,
        error: '',
        data: action.payload
      }
      
    case "FETCH__ERROR":
      return {
        ...currentState,
        loading: false,
        data: [],
        error: action.payload
      }
   
    default:
      return initVal;
  }
}



const Main = () => {

  const {countryState, filter, setFilter} = useContext(countryContext)
  const {countryName, isTyping} = countryState

  const [state, dispatch] = useReducer(reducer, initVal)


  const fetchRequest =(url) => {
    fetch(url)
      .then(res => res.json())
      .then(data => useSuccessRequest(data))
      .catch(err => useErrorRequest(err))
  }

  const useSuccessRequest =(data) => {
    if (data.status === 404) {
      dispatch({
        type: "FETCH__ERROR",
        payload: data.message,
      })
      return
    }
    dispatch({ type: "FETCH__SUCCESSFUL", payload: data })
  }
  
  const useErrorRequest =(err) => {
    dispatch({type: "FETCH__ERROR", payload: `Something went wrong! Check your connection and try again!`})
  }
  
  useEffect(() => {

    if (isTyping && countryName.length) {
      fetchRequest(`https://restcountries.com/v2/name/${countryName}`)
    }
    else if (filter.length && !isTyping) {
      fetchRequest(`https://restcountries.com/v2/region/${filter}`)
    }  else {
      fetchRequest(`https://restcountries.com/v2/all?fields=${Object.values(queryParam)}`)
    }

  }, [countryState, filter])

  
  const {loading, data, error} = state
  return (

    <>
      { 
        loading ? <Loading /> : null 
      }
      
    <section className=' px-16 pt-4 pb-20 grid grid-cols-1 gap-y-8 lg:grid-cols-3 dark:bg-bgDark lg:gap-x-10'>
      
      
      {
        error.length ? <h2 className=' text-center text-3xl font-bold text-gray-800 my-12 dark:text-textDark'>{error}</h2> : null
      }

      {
      data.length ? data.map(({name, flags, population, region, capital}, index) => {

        return (
          <Link  key={name} to={`/details/${name}`}>
            <div className='card cursor-pointer shadow-xl rounded-xl overflow-hidden flex flex-col bg-bgLight dark:bg-elemDark dark:text-textDark'>
            <div className=' '><img className='aspect-3/2 block w-full h-full' src={flags.png} alt="#flag"/></div>
            <div className=' pt-5 pb-8 px-8'>
              <h3 className=' pb-4 text-lg text-center font-bold align'>{name}</h3>
              <ul className=' py-2 flex flex-col gap-y-1'>
                <li><span className=' font-semibold'>Population: </span><span>{population.toLocaleString()}</span></li>
                <li><span className=' font-semibold'>Region: </span><span>{region}</span></li>
                <li><span className=' font-semibold'>Capital: </span><span>{capital}</span></li>
              </ul>
            </div>
          </div>
          </Link>
        )
      }) : null
      }
    </section>
    </>


  )
}

export default Main