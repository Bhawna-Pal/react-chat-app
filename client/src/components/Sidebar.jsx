import React, { useContext, useEffect, useState, useRef } from 'react'
import assets from '../assets/assets.js'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

// Icons
import { FiMoreVertical } from "react-icons/fi"
import { MdGroupAdd, MdStarBorder, MdMarkChatRead } from "react-icons/md"
import { BsChatDots } from "react-icons/bs"
import { IoLockClosedOutline, IoLogOutOutline, IoSearchOutline } from "react-icons/io5"

const Sidebar = () => {

  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext)
  const { logout, onlineusers } = useContext(AuthContext)

  const [input, setInput] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef()

  const filteredUsers = input
    ? users?.filter(user =>
        user?.fullName?.toLowerCase().includes(input.toLowerCase())
      )
    : users

  useEffect(() => {
    getUsers()
  }, [onlineusers])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={`h-full flex flex-col 
      bg-white dark:bg-[#111b21] 
      text-black dark:text-white 
      ${selectedUser ? 'max-md:hidden' : ''}`}>

      {/* 🔝 HEADER */}
      <div className="flex items-center justify-between px-4 py-3">

        <h2 className="text-xl font-bold text-purple-600">
          SyncTalk
        </h2>

        <div className="relative" ref={menuRef}>
          <FiMoreVertical
            size={20}
            className="cursor-pointer text-gray-600 dark:text-gray-300"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          <div className={`
            absolute right-0 mt-2 w-56 rounded-xl shadow-lg z-50
            bg-white dark:bg-[#202c33]
            transition-all duration-200 origin-top-right
            ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
          `}>

            <MenuItem icon={<MdGroupAdd />} text="New group" />
            <MenuItem icon={<MdStarBorder />} text="Starred messages" />
            <MenuItem icon={<BsChatDots />} text="Select chats" />
            <MenuItem icon={<MdMarkChatRead />} text="Mark all as read" />
            <MenuItem icon={<IoLockClosedOutline />} text="App lock" />

            <div className="h-[1px] bg-gray-100 dark:bg-[#2a3942] my-1" />

            <MenuItem
              icon={<IoLogOutOutline />}
              text="Logout"
              danger
              onClick={logout}
            />
          </div>
        </div>
      </div>

      {/* 🔍 SEARCH */}
      <div className="px-3 pb-3">
        <div className="flex items-center rounded-full px-3 py-2
          bg-gray-100 dark:bg-[#202c33]">
          
          <IoSearchOutline className="text-gray-500 mr-2" size={18} />
          
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent outline-none text-sm w-full 
            text-gray-700 dark:text-gray-200 
            placeholder-gray-400"
          />
        </div>
      </div>

      {/* 👥 USERS */}
      <div className="flex-1 overflow-y-auto">

        {filteredUsers?.map((user, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedUser(user)
              setUnseenMessages(prev => ({ ...prev, [user._id]: 0 }))
            }}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition
            ${selectedUser?._id === user._id
              ? 'bg-purple-50 dark:bg-[#2a3942]'
              : 'hover:bg-gray-50 dark:hover:bg-[#202c33]'
            }`}
          >

            <img
              src={user?.profilePic || assets.avatar_icon}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate
                text-gray-800 dark:text-gray-200">
                {user.fullName}
              </p>

              <p className={`text-xs ${
                onlineusers?.includes(user._id.toString())
                  ? 'text-green-500'
                  : 'text-gray-400'
              }`}>
                {onlineusers?.includes(user._id.toString())
                  ? 'online'
                  : 'offline'}
              </p>
            </div>

            {unseenMessages[user._id] > 0 && (
              <div className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                {unseenMessages[user._id]}
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  )
}

// 🔹 Menu Item
const MenuItem = ({ icon, text, danger, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition
    hover:bg-gray-100 dark:hover:bg-[#2a3942]
    ${danger ? 'text-red-500' : 'text-gray-700 dark:text-gray-200'}`}
  >
    <span className="text-lg">{icon}</span>
    {text}
  </div>
)

export default Sidebar