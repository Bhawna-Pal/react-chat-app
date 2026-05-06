import React, { useContext } from "react"; // ✅ Added useContext
import assets from "../assets/assets.js";
import { AuthContext } from "../../context/AuthContext"; // ✅ Adjust this path according to your folder structure
import {
  FiFolder,
  FiMessageSquare,
  FiUsers,
  FiSettings,
  FiMoon,
  FiSun
} from "react-icons/fi";

function LeftSidebar({ toggleTheme, darkMode }) {
  // ✅ Fetch current user from AuthContext
  const { authUser } = useContext(AuthContext);

  return (
    <div className="h-full w-64 
    bg-white dark:bg-[#111b21] 
    border-r border-gray-200 dark:border-[#222]
    flex flex-col justify-between 
    p-5 
    text-gray-800 dark:text-gray-100 
    transition-colors duration-300">

      {/* 🔝 TOP */}
      <div>
        {/* LOGO */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-wide text-purple-600">
            SyncTalk
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Stay connected
          </p>
        </div>

        {/* NEW MESSAGE */}
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all duration-200 shadow-sm">
          + New Message
        </button>

        {/* MENU */}
        <div className="mt-8 space-y-2">
          <MenuItem icon={<FiMessageSquare />} text="Messages" active />
          <MenuItem icon={<FiUsers />} text="Contacts" />
          <MenuItem icon={<FiFolder />} text="Files" />
          <MenuItem icon={<FiSettings />} text="Settings" />
        </div>
      </div>

      {/* 🔻 BOTTOM */}
      <div className="mt-auto border-t border-gray-200 dark:border-[#222] pt-4 space-y-4">

        {/* 🌙 THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg 
          bg-gray-100 dark:bg-[#202c33] 
          hover:bg-gray-200 dark:hover:bg-[#2a3942] 
          transition-all duration-200"
        >
          <span className="text-sm font-medium">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* 👤 DYNAMIC PROFILE SECTION */}
        <div className="flex items-center gap-3 cursor-pointer 
        hover:bg-gray-100 dark:hover:bg-[#202c33] 
        p-2 rounded-lg transition-all duration-200">
          
          <img
            src={authUser?.profilePic || assets.avatar_icon} // ✅ Real Profile Pic or Default Avatar
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border dark:border-gray-700"
          />

          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
              {authUser?.fullName || "Guest User"} {/* ✅ Dynamic Name */}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span> {/* ✅ Real Online Dot */}
              <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* 🔹 MENU ITEM COMPONENT */
const MenuItem = ({ icon, text, active }) => (
  <div
    className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200
    ${
      active
        ? "bg-purple-50 text-purple-600 dark:bg-[#202c33]"
        : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#202c33]"
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default LeftSidebar;