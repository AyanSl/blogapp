import React, { useEffect, useState } from 'react'
import Blogcard from "./blogcard"

const blog = () => {

  const [blogs , setblogs] = useState();


  const FetchBlogs = async () =>{
    const res =  await  fetch('http://127.0.0.1:8000/api/blogs');
    const result = await res.json()
    console.log(result.data);
    setblogs(result.data);
  }

  useEffect(()=>{
    FetchBlogs();
  },[])

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between pt-5 mb-4">
          <h4>Blogs</h4>
          <a href="/create" className="btn btn-dark">Create</a>
        </div>
        <div className="row">
            {
              (blogs) && blogs.map((blog) => {
                return (<Blogcard blogdata={blog} key={blog.id} />)
              })
            }
          </div>
        </div>
    </>
  )
}

export default blog