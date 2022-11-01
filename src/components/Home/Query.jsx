import React, { useContext, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { AppContext } from '../../App'
import { countryContext } from './Home'

const Query = () => {

  const {countryState, dispatchAction, filter, setFilter} = useContext(countryContext)

  const {dropdown, setDropdown} = useContext(AppContext)

  const controlField = e => {
    dispatchAction({
      type: "is__Typing",
      event: e.target.value
    })
  }

  const controlFilter = (param) => {
    setFilter(param)
    dispatchAction({
      type: "reset"
    })
  }

  const submitHandler = e => {
    e.preventDefault()
    // dispatchAction({
    //   type: "reset"
    // })
  }

  return (
    <div>
      <section className='query flex flex-col gap-y-8 py-8 px-4 lg:flex-row justify-between lg:px-16  dark:bg-bgDark'>
        <form onSubmit={submitHandler} className='search-box flex items-center lg:basis-1/3'>
          <AiOutlineSearch className=' absolute ml-8 cursor-pointer text-xl font-extralight dark:text-inputLight' />
          <input value={countryState.countryName} onChange={e => controlField(e)} className=' outline-none rounded-md text-inputLight shadow-sm w-full block pl-14 py-3 text-base font-normal shadow-inputLight dark:shadow-elemDark dark:bg-elemDark dark:text-textDark' type="search" name="search" id="search" placeholder='Search for a country..' />
        </form>
        <div className='filter-box w-48 relative'>
          <div onClick={() => setDropdown(!dropdown)} className=' dropdownMenu shadow-lg rounded-md px-4 py-3 flex items-center justify-between gap-x-1 cursor-pointer dark:bg-elemDark dark:text-textDark'>
            <span className=' dropdownMenu'>Filter by Region</span>
            <BsChevronDown className=' dropdownMenu'/>
          </div>
            {/* {Change to flex ⬇} */}
          {
            dropdown ? <ul className=' z-10 mt-0.5 bg-bgLight absolute left-0 right-0 min-h-full rounded-lg shadow-sm shadow-inputLight overflow-hidden dark:bg-elemDark dark:text-textDark dark:shadow-slate-900'>
            <li onClick={() => controlFilter("africa")} className=' py-2 pt-3 px-6 hover:bg-slate-300 cursor-pointer dark:hover:bg-bgDark'>Africa</li>
            <li onClick={() => controlFilter("americas")} className=' py-2 px-6 hover:bg-slate-300 cursor-pointer dark:hover:bg-bgDark'>Americas</li>
            <li onClick={() => controlFilter("europe")} className=' py-2 px-6 hover:bg-slate-300 cursor-pointer dark:hover:bg-bgDark'>Europe</li>
            <li onClick={() => controlFilter("asia")} className=' py-2 px-6 hover:bg-slate-300 cursor-pointer dark:hover:bg-bgDark'>Asia</li>
            <li onClick={() => controlFilter("oceania")} className=' py-2 pb-3 px-6 hover:bg-slate-300 cursor-pointer dark:hover:bg-bgDark'>Oceania</li>
          </ul> : null
          }
        </div>
      </section>
      <section className='display'></section>
    </div>
  )
}

export default Query