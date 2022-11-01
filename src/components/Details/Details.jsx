import React, { useEffect, useReducer } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Reusables/Loading/Loading'

const initState = {
  loading: true,
  data: [],
  error: '',
}

const reducer =(currentState, action) => {
  switch (action.type) {
    case "FETCH__SUCCESSFUL":
      return {
        ...currentState,
        loading: false,
        error: '',
        data: action.payload,
      }
    
    case "FETCH__ERROR":
      return {
        ...currentState,
        loading: false,
        data: [],
        error: action.payload,
      }
    
    default:
      return initState;
  }
}

const Details = () => {

  const param = useParams()

  const [state, dispatch] = useReducer(reducer, initState)

  const fetchUrl = url => {
    fetch(url)
     .then(res => res.json())
     .then(data => useSuccessResult(data))
     .catch(err => useErrorResult(err))
  }

  const useSuccessResult = data => {
    if (data.status === 404) {
      dispatch({
        type: "FETCH__ERROR",
        payload: data.message,
      })
      return
    }
    dispatch({
      type: "FETCH__SUCCESSFUL",
      payload: data
    })
  }

  const useErrorResult = error => {
    dispatch({
      type: "FETCH__ERROR",
      payload: error.message
    })
  }

  useEffect(() => {
    fetchUrl(`https://restcountries.com/v2/name/${param["id"]}`)

  }, [param])
  
  const {loading, data, error} = state

  return (
    <div className=' px-4 pt-8 pb-16 text-base font-normal dark:bg-bgDark dark:text-textDark lg:px-16'>
      {
        loading ? <Loading /> : null
      }
      {
        data.length ? <>
          <div className="back-btn pb-16">
        <Link to="/">
          <button className=' py-1.5 px-8 rounded-sm bg-textDark flex gap-x-2 justify-center items-center shadow-md shadow-zinc-300 dark:bg-elemDark dark:shadow-bgDark'><BsArrowLeft />Back</button>
        </Link>
      </div>
      <section className="country-details flex flex-col lg:flex-row lg:gap-x-20">
        <div className=" aspect-5/3 overflow-hidden rounded lg:flex-1">
          <img src={data[0].flags.png} alt="#flag" className=' w-full h-full object-cover object-center'/>
        </div>
        <div className=" pt-16 lg:flex lg:justify-between lg:flex-col details-info lg:flex-1 lg:py-8 ">
          <h3 className=" font-extrabold text-xl mb-4">{data[0].name}</h3>

        <div className=' flex flex-col gap-y-8 lg:flex-row lg:justify-between'>
          <ul className=' flex flex-col gap-y-2'>
            <li><label className=' font-semibold' htmlFor="country-nativeName">Native Name: </label><span>{data[0].nativeName}</span></li>
            <li><label className=' font-semibold' htmlFor="country-population">Population: </label><span>{data[0].population.toLocaleString()}</span></li>
            <li><label className=' font-semibold' htmlFor="country-region">Region: </label><span>{data[0].region}</span></li>
            <li><label className=' font-semibold' htmlFor="country-subregion">Sub Region: </label><span>{data[0].subregion}</span></li>
            <li><label className=' font-semibold' htmlFor="country-capital">Capital: </label><span>{data[0].capital}</span></li>
          </ul>
          <ul className=' flex flex-col'>
            <li><label className=' font-semibold' htmlFor="country-topLevelDomain">Top Level Domain: </label><span>{data[0].topLevelDomain}</span></li>
            <li><label className=' font-semibold' htmlFor="country-currencies">Currencies: </label>
            {
              data[0].currencies.map((currency, index) => {
                return (
                  <span className=' mr-3' key={index}>{currency.name} (<i>{currency.code}</i>)</span>
                )
              })
            }
            </li>
            <li><label className=' font-semibold' htmlFor="country-languages">Languages: </label>
            {
              data[0].languages ? data[0].languages.map((language, index) => {
                return (
                  <span className=' mr-3' key={index}>{language.name} (<i>{language.nativeName}</i>)</span>
                )
              }) : null
            }
            </li>
          </ul>
        </div>

        <div className=' mt-8'>
          <h4 className=' font-bold mb-4 '>Borders Countries:</h4>
          <ul className=' flex gap-4 flex-wrap'>
            {
              data[0].borders ? data[0].borders.map((border, index) => {
                return <li key={index} className=' flex-1 max-w-max text-center font-semibold border-2 py-1 px-3 rounded bg-textDark dark:bg-elemDark'>{border}</li>
              }) : null
            }
          </ul>
        </div>
        </div>
      </section>
        </> : null
      }
      
    </div>
  )
}

export default Details