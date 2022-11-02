import './index.css'
import { Route, Routes } from 'react-router-dom'
import Details from './components/Details/Details'
import Home from './components/Home/Home'
import Header from './components/Reusables/Header'
import { createContext, useState } from 'react'
import Error from './components/Reusables/Error'
import { useEffect } from 'react'
import Loading from './components/Reusables/Loading/Loading'

export const AppContext = createContext()

function App() {

  const handleClick = e => {
    if (!e.target.classList.contains("dropdownMenu")) {
      setDropdown(false)
    }
  }

  const [dropdown, setDropdown] = useState(false)
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    console.log(theme)
  
  }, [theme])
  

  return (
    <AppContext.Provider value={{dropdown, setDropdown, theme, setTheme}}>
      <div onClick={e => handleClick(e)} className={`${theme ? "dark" : ""} page__control font-nunito font-light text-base bg-bgLight min-h-screen text-bgDark`} style={{backgroundColor: theme && "hsl(207, 26%, 17%)"}}>
        <Header />
        <Routes>
          <Route path='CountriesApp/' element={<Home/>} />
          <Route path='*' element={<Error/>} />
          <Route path='CountriesApp/details/:id' element={<Details/>}>
            
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
