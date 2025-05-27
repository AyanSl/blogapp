import React from 'react'
import { toast } from 'react-toastify';



function blogcard({blogdata , blogs , setblogs}) {

    const  ShowImage = (img) =>{
        return (img) ? 'http://127.0.0.1:8000/uploads/blogs/'+img : 'https://placehold.co/600x400';
    }

    const Blogdelete = (id) => {
        if(confirm("you want to delete")){
            fetch("http://localhost:8000/api/blogs/" + id, {
            method: "DELETE",
        });

        const newBlog = blogs.filter((blog) => blog.id != id)
        setblogs(newBlog);
        toast("Blog deleted successfully");
        }
    }

    return (
        <div className="col-12 col-md-4 col-lg-3 mb-4">
            <div className="card border-0 shadow-lg">
                <img src={ShowImage(blogdata.image)} alt="card-img-top" style={{height:'200px'}} />
                <div className="card-body">
                    <h2 className="h5">{blogdata.title}</h2>
                    <p>{blogdata.shortdesc}</p>
                    <div className="d-flex justify-content-between pt-5">
                        <a href={'blog/'+blogdata.id} className="btn btn-dark">Details</a>
                        <div>
                        <a className="text-danger" onClick={() => Blogdelete(blogdata.id)}> 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        </a>
                        <a href={'blog/edit/'+blogdata.id} className="text-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default blogcard