import React, { useEffect, useState } from 'react'
import Blogcard from "./blogcard"

const blog = () => {

  const [blogs , setblogs] = useState();
  const [keyword , setkeyword] = useState('');


  const FetchBlogs = async () =>{
    const res =  await  fetch('http://127.0.0.1:8000/api/blogs');
    const result = await res.json();
    setblogs(result.data);
  }

  useEffect(()=>{
    FetchBlogs();
  },[])

  const formserchsubmit = async (event) =>{
    event.preventDefault();
    const res =  await  fetch('http://127.0.0.1:8000/api/blogs?keyword='+keyword);
    const result = await res.json();
    console.log(result.data);
    setblogs(result.data);
  }

  const RestForm = () => {
    FetchBlogs();
    setkeyword('');
  }

  return (
    <>
      <div className="container">
        
        <div className="d-flex justify-content-center pt-5 mb-4">
            <form onSubmit={(e) => formserchsubmit(e)}>
          <div className='d-flex'>
            <input type="text" placeholder='Enter a keyword' value={keyword} onChange={(e) => setkeyword(e.target.value)} className='form-control' />
            <button className="btn btn-dark ms-2">Search</button>
            <button className="btn btn-info ms-2" onClick={(e) => RestForm(e)}>Reset</button>
          </div>
            </form>
        </div>

        <div className="d-flex justify-content-between pt-5 mb-4">
          <h4>Blogs</h4>
          <a href="/create" className="btn btn-dark">Create</a>
        </div>
        <div className="row">
            {
              (blogs) && blogs.map((blog) => {
                return (<Blogcard blogs={blogs} setblogs={setblogs} blogdata={blog} key={blog.id} />)
              })
            }
          </div>
        </div>
    </>
  )
}

export default blog