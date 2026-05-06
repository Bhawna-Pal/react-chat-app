import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage }from '/pages/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'

const App = () => {

  const { authUser } = useContext(AuthContext)

  // ✅ DARK MODE STATE
  const [darkMode, setDarkMode] = useState(false)

  // ✅ TOGGLE FUNCTION
  const toggleTheme = () => {
    setDarkMode(prev => !prev)
  }

  // ✅ APPLY CLASS ON ROOT HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div
      className="
      min-h-screen
      bg-[url('/bg_image.svg')] 
      bg-cover bg-center
      dark:bg-[#0b141a]
      transition-colors duration-300
      "
    >
      <Toaster />

      <Routes>

        <Route
          path='/'
          element={
            authUser
              ? <HomePage toggleTheme={toggleTheme} darkMode={darkMode} />
              : <Navigate to="/login" />
          }
        />

        <Route
          path='/login'
          element={
            !authUser
              ? <LoginPage />
              : <Navigate to="/" />
          }
        />

        <Route
          path='/profile'
          element={
            authUser
              ? <ProfilePage />
              : <Navigate to="/login" />
          }
        />

      </Routes>
    </div>
  )
}

export default App