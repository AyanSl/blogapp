import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function blogdetail() {

    const [blog ,  setblog] =  useState('');
    const params = useParams();

    const  ShowImage = (img) =>{
        return (img) ? 'http://127.0.0.1:8000/uploads/blogs/'+img : 'https://placehold.co/600x400';
    }

    const FetchBlog = async () =>{
        const res = await fetch('http://127.0.0.1:8000/api/blogs/' + params.id)
        const result = await res.json();
        setblog(result.data);
    }
    console.log(blog);
    
    useEffect(()=>{
        FetchBlog();
    } ,[])

  return (
    
    <div className="container">
        <div className="d-flex justify-content-between pt-5 mb-4">
          <h4>{blog.title}</h4>
          <a href="/" className="btn btn-dark">Back To blogs</a>
        </div>
        <div className="row">
            <div className="col-md-12">
                <p>by <strong>{blog.author}</strong> on {blog.date}</p>
                {
                    (blog.image) && <img className='w-100' src={`http://127.0.0.1:8000/uploads/blogs/${blog.image}`}  style={{height:"200px"}} />
                }
                <div dangerouslySetInnerHTML={{__html: blog.description}} className='mt-3'>
                </div>
            </div>
          </div>
        </div>
  )
}

export default blogdetail