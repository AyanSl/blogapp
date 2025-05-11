import React from 'react'
import Blog from "./compnents/blog"
import Blogpost from "./compnents/blogpost"
import Blogdetail from "./compnents/blogdetail"
import { Route , Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <>
      <div className="bg-dark text-center py-2 shadow-lg">
        <h1 className="text-white">React & Laravel Blog App</h1>
      </div>
      <Routes>
        <Route path='/' element={<Blog/>} /> 
        <Route path='/create' element={<Blogpost/>} /> 
        <Route path='/blog/:id' element={<Blogdetail />} /> 
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
