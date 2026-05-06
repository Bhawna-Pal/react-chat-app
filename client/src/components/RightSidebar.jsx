import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'

// Icons
import { IoClose, IoVolumeMuteOutline } from "react-icons/io5"
import { FiEdit } from "react-icons/fi"
import {
  MdOutlinePhotoLibrary,
  MdStarBorder,
  MdDeleteOutline,
  MdBlock,
  MdOutlineTimer,
  MdLockOutline,
  MdPrivacyTip
} from "react-icons/md"
import { AiOutlineHeart } from "react-icons/ai"

export const RightSidebar = ({ onClose }) => {

  const { selectedUser, messages } = useContext(ChatContext)
  const [media, setMedia] = useState([])
  const [mute, setMute] = useState(false)

  useEffect(() => {
    setMedia(messages?.filter(m => m.image).map(m => m.image))
  }, [messages])

  return selectedUser && (
    <div className="h-full flex flex-col 
    bg-white dark:bg-[#111b21] 
    text-gray-800 dark:text-gray-200">

      {/* 🔝 HEADER */}
      <div className="flex items-center justify-between px-3 py-3 
      border-b border-gray-200 dark:border-[#2a3942] 
      sticky top-0 bg-white dark:bg-[#111b21] z-10">

        <div className="flex items-center gap-3">
          <IoClose size={24} 
            className="cursor-pointer text-gray-700 dark:text-gray-300"
            onClick={onClose} 
          />
          <h2 className="font-medium">
            Contact info
          </h2>
        </div>

        <FiEdit size={18} 
          className="cursor-pointer text-gray-600 dark:text-gray-300" 
        />
      </div>

      {/* 📜 SCROLL */}
      <div className="flex-1 overflow-y-auto">

        {/* 👤 PROFILE */}
        <div className="flex flex-col items-center py-6">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            className="w-24 h-24 rounded-full object-cover"
          />
          <h2 className="mt-3 font-semibold text-lg">
            {selectedUser.fullName}
          </h2>
        </div>

        {/* ℹ️ ABOUT */}
        <div className="px-4 py-4 border-b border-gray-100 dark:border-[#2a3942]">
          <p className="text-xs text-gray-500 mb-1">About</p>
          <p className="text-sm text-gray-800 dark:text-gray-300">
            {selectedUser.bio || "Hey there! I am using SyncTalk"}
          </p>
        </div>

        {/* 📁 MEDIA */}
        <div className="px-4 py-4 border-b border-gray-100 dark:border-[#2a3942] 
        hover:bg-gray-50 dark:hover:bg-[#202c33] transition cursor-pointer">

          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MdOutlinePhotoLibrary size={18} />
              Media, links and docs
            </div>
            <span className="text-xs text-gray-500">
              {media.length}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {media.slice(0, 6).map((m, i) => (
              <img 
                key={i} 
                src={m} 
                className="h-20 w-full object-cover rounded" 
              />
            ))}
          </div>
        </div>

        {/* ⚙️ OPTIONS */}
        <div className="text-sm">

          <Menu icon={<MdStarBorder />} text="Starred messages" />

          {/* 🔊 MUTE */}
          <div
            onClick={() => setMute(!mute)}
            className="flex items-center justify-between px-4 py-3 cursor-pointer 
            hover:bg-gray-100 dark:hover:bg-[#202c33]"
          >
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <IoVolumeMuteOutline size={18} />
              Mute notifications
            </div>

            {/* Toggle */}
            <div className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
              mute ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
            }`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                mute ? "translate-x-5" : ""
              }`} />
            </div>
          </div>

          <Menu icon={<MdOutlineTimer />} text="Disappearing messages" />
          <Menu icon={<MdPrivacyTip />} text="Advanced chat privacy" />

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-[#2a3942] my-2"></div>

          <Menu icon={<MdLockOutline />} text="Encryption" />

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-[#2a3942] my-2"></div>

          <Menu icon={<AiOutlineHeart />} text="Add to favourites" />
          <Menu icon={<MdOutlinePhotoLibrary />} text="Add to list" />
          <Menu icon={<MdDeleteOutline />} text="Clear chat" />
          <Menu icon={<MdBlock />} text={`Block ${selectedUser.fullName}`} danger />
          <Menu icon={<MdBlock />} text={`Report ${selectedUser.fullName}`} danger />
          <Menu icon={<MdDeleteOutline />} text="Delete chat" danger />

        </div>

      </div>
    </div>
  )
}

// 🔹 Menu Item
const Menu = ({ icon, text, danger }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition
    hover:bg-gray-100 dark:hover:bg-[#202c33]
    ${danger ? "text-red-500" : "text-gray-700 dark:text-gray-300"}`}
  >
    <span className="text-lg">{icon}</span>
    {text}
  </div>
)