import React, { useEffect, useRef, useState, useContext } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

// Icons
import { FiPhone, FiVideo, FiSearch, FiMoreVertical } from "react-icons/fi"
import { IoAttach, IoMicOutline, IoSend, IoClose } from "react-icons/io5"
import { MdOutlineEmojiEmotions, MdInfoOutline, MdDeleteOutline, MdBlock } from "react-icons/md"
import { AiOutlineClear } from "react-icons/ai"

const ChatContainer = ({ openProfile, darkMode }) => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages, clearChat, deleteChat } = useContext(ChatContext)
  const { authUser, onlineusers } = useContext(AuthContext)

  const scrollEnd = useRef()
  const menuRef = useRef() // Ref for three-dots menu
  const [input, setInput] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser._id)
  }, [selectedUser, getMessages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (input.trim() === "") return
    await sendMessage({ text: input.trim() })
    setInput("")
  }

  if (!selectedUser) return null;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#0b141a]">
      
      {/* 🔝 HEADER */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#202c33] border-b dark:border-gray-800 z-20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={openProfile}>
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            className="w-10 h-10 rounded-full object-cover border dark:border-gray-700"
            alt=""
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">{selectedUser?.fullName}</p>
            <span className={`text-xs ${onlineusers?.includes(selectedUser?._id?.toString()) ? 'text-green-500' : 'text-gray-400'}`}>
              {onlineusers?.includes(selectedUser?._id?.toString()) ? 'online' : 'offline'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
          <FiPhone size={20} className="cursor-pointer hover:text-purple-600" />
          <FiVideo size={20} className="cursor-pointer hover:text-purple-600" />
          
          {/* ✅ FIXED THREE DOTS MENU */}
          <div className="relative" ref={menuRef}>
            <FiMoreVertical 
              size={22} 
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-0.5" 
              onClick={() => setMenuOpen(!menuOpen)} 
            />
            
           {menuOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#233138] rounded-lg shadow-xl border dark:border-gray-700 py-2 z-50 animate-in fade-in zoom-in duration-200">
    <MenuOption 
      icon={<MdInfoOutline />} 
      text="Contact info" 
      onClick={() => { setMenuOpen(false); openProfile(); }} 
    />

    {/* ✅ Clear Chat Logic */}
    <MenuOption 
      icon={<AiOutlineClear />} 
      text="Clear chat" 
      onClick={() => {
        if (window.confirm("Are you sure you want to clear all messages?")) {
          clearChat(selectedUser._id);
        
        setMenuOpen(false);
        }
      }} 
    />

    {/* ✅ Delete Chat Logic */}
    <MenuOption 
      icon={<MdDeleteOutline />} 
      text="Delete chat" 
      danger 
      onClick={() => {
        if (window.confirm("Are you sure you want to delete this chat and remove the user?")) {
          deleteChat(selectedUser._id);
        }
        setMenuOpen(false);
      }} 
    />

    <MenuOption 
      icon={<MdBlock />} 
      text="Block user" 
      danger 
      onClick={() => setMenuOpen(false)} 
    />

    <hr className="my-1 border-gray-100 dark:border-gray-700" />
    
    <MenuOption 
      icon={<IoClose />} 
      text="Close chat" 
      onClick={() => {
        setSelectedUser(null);
        setMenuOpen(false);
      }} 
    />
  </div>
)}
          </div>
        </div>
      </div>

      {/* 💬 MESSAGES AREA */}
      <div 
        className="flex-1 overflow-y-auto px-4 py-3"
        style={{
          backgroundImage: darkMode ? "url('/Chat_dark.svg')" : "url('/Chat_light.svg')",
          backgroundSize: '350px', 
          backgroundRepeat: 'repeat',
          backgroundColor: darkMode ? '#0b141a' : '#f0f2f5',
        }}
      >
        <div className="flex flex-col justify-end min-h-full space-y-3"> 
          {messages?.map((msg, index) => {
            const isMe = msg.senderId === authUser?._id
            const avatarSrc = isMe 
              ? (authUser?.profilePic || assets.avatar_icon) 
              : (selectedUser?.profilePic || assets.avatar_icon);

            return (
              <div key={index} className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                <img src={avatarSrc} className="w-8 h-8 rounded-full border dark:border-gray-700 object-cover" alt="" />
                <div className={`max-w-[75%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-2 text-sm shadow-sm ${
                    isMe ? 'bg-purple-600 text-white rounded-2xl rounded-tr-none'
                         : 'bg-white dark:bg-[#202c33] text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <p className="text-[10px] mt-1 text-gray-500">{formatMessageTime(msg.createdAt)}</p>
                </div>
              </div>
            )
          })}
          <div ref={scrollEnd}></div>
        </div>
      </div>

      {/* 📝 INPUT */}
      <div className="bg-white dark:bg-[#202c33] px-3 py-3 flex items-center gap-2 border-t dark:border-gray-800 z-10">
        <IoAttach size={24} className="text-gray-500 cursor-pointer" />
        <div className="flex-1 flex items-center bg-gray-100 dark:bg-[#2a3942] rounded-full px-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
            placeholder="Type a message"
            className="flex-1 bg-transparent py-2.5 outline-none text-sm dark:text-white"
          />
          <MdOutlineEmojiEmotions className="text-gray-500 cursor-pointer" size={20} />
        </div>
        <button onClick={handleSendMessage} className="p-2 bg-purple-600 text-white rounded-full shadow-lg">
          <IoSend size={20} />
        </button>
      </div>
    </div>
  )
}

// ✅ HELPER COMPONENT FOR MENU OPTIONS
const MenuOption = ({ icon, text, onClick, danger }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition-colors
      ${danger ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a3942]'}
    `}
  >
    <span className="text-lg">{icon}</span>
    {text}
  </div>
)

export default ChatContainer