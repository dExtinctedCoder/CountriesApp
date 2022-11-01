import React, { useContext } from 'react'
import { BsMoon } from 'react-icons/Bs'
import { AppContext } from '../../App'

const Header = () => {


  const {theme, setTheme} = useContext(AppContext)

  return (
    <header className=" sticky top-0 left-0 right-0 z-50 shadow-md flex items-center bg-bgLight dark:bg-elemDark dark:text-textDark">
      <div className='header-control w-full flex items-center justify-between py-6 px-4 lg:px-16'>
        <div><h2 className=' font-extrabold'>Where in the world?</h2></div>
        <div className=' font-semibold flex items-center justify-between'>
          <BsMoon onClick={() => setTheme(!theme)} className='cursor-pointer'/>
          <span className=' ml-2'>Dark Mode</span>
        </div>
      </div>
    </header>
  )
}

export default Header