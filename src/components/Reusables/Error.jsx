import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className=" px-8 pt-16 py-5">
      <h3 className=" text-center mb-10 text-4xl font-bold dark:text-textDark">Page Not Found!</h3>
      <Link to="/" className=" text-sm ml-3 py-2 px-4 text-textDark bg-bgDark dark:bg-inputLight">Back to home</Link>
    </div>
  )
}

export default Error