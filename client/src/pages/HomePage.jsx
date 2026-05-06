import React, { useContext, useState } from 'react'
import LeftSidebar from '../components/LeftSidebar'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { RightSidebar } from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'
import assets from '../assets/assets'

const HomePage = ({ toggleTheme, darkMode }) => {
  const { selectedUser } = useContext(ChatContext)
  const [showRightSidebar, setShowRightSidebar] = useState(false)

  return (
    <div className={`
      h-screen w-full flex overflow-hidden
      bg-white dark:bg-[#0b141a]
      transition-colors duration-300
      ${darkMode ? 'dark' : ''} 
    `}>

      {/* ✅ LEFT SIDEBAR */}
      <div className="hidden md:flex bg-white dark:bg-[#111b21] border-r border-gray-200 dark:border-[#222]">
        <LeftSidebar toggleTheme={toggleTheme} darkMode={darkMode} />
      </div>

      {/* ✅ CHAT LIST */}
      <div className="w-full md:w-80 flex-shrink-0 bg-white dark:bg-[#111b21] border-r border-gray-200 dark:border-[#222]">
        <Sidebar />
      </div>

      {/* ✅ CHAT AREA */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#0b141a]">
        {selectedUser ? (
          <ChatContainer 
            openProfile={() => setShowRightSidebar(true)} 
            darkMode={darkMode} 
          />
        ) : (
          /* ✅ CUSTOM EMPTY STATE WITH YOUR LOGO & MSG */
          <div className='h-full flex flex-col items-center justify-center gap-2 bg-[#f0f2f5] dark:bg-[#0b141a] max-md:hidden'>
            <img src={assets.logo_icon} className='max-w-16 opacity-90' alt="SyncTalk Logo" />
            <p className='text-lg font-medium text-gray-600 dark:text-white'>Chat anytime, anywhere</p>
          </div>
        )}
      </div>

      {/* ✅ RIGHT SIDEBAR */}
      {selectedUser && showRightSidebar && (
        <div className="hidden md:block w-80 flex-shrink-0 bg-white dark:bg-[#111b21] border-l border-gray-200 dark:border-[#222]">
          <RightSidebar onClose={() => setShowRightSidebar(false)} />
        </div>
      )}
    </div>
  )
}

export default HomePage