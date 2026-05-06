import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

export const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault()

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return
    }

    login(currState === "Sign up" ? 'signup' : 'login', {
      fullName,
      email,
      password,
      bio
    })
  }

  return (
    <div className="
      min-h-screen flex items-center justify-evenly px-4 sm:px-6 lg:px-10 py-10 gap-10
      bg-gray-100 dark:bg-[#0b141a]
      transition-colors duration-300
      max-sm:flex-col
    ">

      {/* ✅ UPDATED LEFT LOGO & TEXT SECTION */}
      <div className="flex flex-col items-center justify-center gap-3">
        <img 
          src={assets.logo_icon} 
          alt="SyncTalk Logo" 
          className="w-[min(25vw,160px)] opacity-90"
        />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-purple-600 dark:text-white transition-colors duration-300">
          SyncTalk
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Stay Connected
        </p>
      </div>

      {/* 🧾 FORM */}
      <form
        onSubmit={onSubmitHandler}
        className="
          w-full max-w-[380px]
          bg-white dark:bg-[#111b21]
          border border-gray-200 dark:border-[#2a3942]
          rounded-2xl shadow-xl
          p-8 flex flex-col gap-6
          text-gray-800 dark:text-gray-200
          transition-all duration-300
        "
      >

        {/* HEADER */}
        <h2 className="text-2xl font-bold flex justify-between items-center text-purple-600 dark:text-white">
          {currState}

          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="Back"
              className="w-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            />
          )}
        </h2>

        {/* NAME */}
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2a3942] border border-gray-200 dark:border-transparent focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          />
        )}

        {/* EMAIL + PASSWORD */}
        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2a3942] border border-gray-200 dark:border-transparent focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2a3942] border border-gray-200 dark:border-transparent focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
          </>
        )}

        {/* BIO */}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            placeholder="Write something about you..."
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2a3942] border border-gray-200 dark:border-transparent focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
          />
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-lg text-white font-bold text-lg
            bg-purple-600 hover:bg-purple-700
            transform active:scale-[0.98]
            transition-all duration-200 shadow-lg shadow-purple-500/20
          "
        >
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>

        {/* TERMS */}
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <input type="checkbox" className="w-4 h-4 rounded accent-purple-600" />
          <p>Agree to terms & privacy policy</p>
        </div>

        {/* SWITCH */}
        <div className="text-center text-sm text-gray-500">
          {currState === "Sign up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login")
                  setIsDataSubmitted(false)
                }}
                className="text-purple-600 cursor-pointer font-bold hover:underline ml-1"
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <span
                onClick={() => setCurrState("Sign up")}
                className="text-purple-600 cursor-pointer font-bold hover:underline ml-1"
              >
                Sign up
              </span>
            </p>
          )}
        </div>

      </form>
    </div>
  )
}