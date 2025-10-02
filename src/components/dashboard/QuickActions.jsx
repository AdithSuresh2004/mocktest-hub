import React from 'react'
import { Link } from 'react-router-dom'
import { FaBook, FaHourglassHalf } from 'react-icons/fa'

const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Link
        to="/exams"
        className="flex transform items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <FaBook className="mr-3 text-2xl" />
        <span className="text-lg font-semibold">Browse All Exams</span>
      </Link>
      <Link
        to="/pending"
        className="flex transform items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-6 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <FaHourglassHalf className="mr-3 text-2xl" />
        <span className="text-lg font-semibold">Resume Pending Test</span>
      </Link>
    </div>
  )
}

export default QuickActions
