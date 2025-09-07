"use client"
import React from "react"
import { motion } from "framer-motion"
import { MapPin, Edit3, Save, Download } from "lucide-react"

const UserHeader = ({ userData, isEditing, setIsEditing, exportCV }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {userData.name.charAt(0)}
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{userData.name}</h1>
            <p className="text-blue-600 dark:text-blue-400 font-medium">{userData.title}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 flex items-center">
              <MapPin size={14} className="mr-1" />
              {userData.location}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
          >
            {isEditing ? <Save size={18} className="mr-2" /> : <Edit3 size={18} className="mr-2" />}
            {isEditing ? 'Salvar' : 'Editar'}
          </button>
          <button
            onClick={exportCV}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            <Download size={18} className="mr-2" />
            Exportar CV
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default UserHeader
