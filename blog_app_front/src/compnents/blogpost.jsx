import React, { useState } from 'react'
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const blogpost = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [Description, setDescription] = useState(null);
    const [ImageId , setImageId] = useState(null);

    const handlefilechange =  async  (event) =>{
        const file = event.target.files[0];
        const formdata = new  FormData();

        formdata.append("image" , file);

        const res = await fetch("http://localhost:8000/api/save-temp-image" , {
            method : "post",
            body: formdata
        });

        const result = await res.json();
        console.log(result);

        if(result.status == false){
            toast(result.error.image[0]);
            event.target.value = null;
        }else{
            setImageId(result.image.id);
        }
 
    }

    function onChange(e) {
        setDescription(e.target.value);
    }

    

    const formSubmit = async (data) => {
        const newData = {...data , "description" : Description , 'image_id': ImageId}
        try{
            const res =  await fetch('http://localhost:8000/api/blogs',{
                method: "post",
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(newData)
            });
            toast("Blog Posted Successfully");
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h4>Create</h4>
                <a href="/" className="btn btn-dark">Back</a>
            </div>
            <div className="card border-0 shadow-lg">
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="card-body">
                        <div className="mb-3">
                            <label>Title</label>
                            <input type="text" {...register('title' , {required: true })} 
                            className={`form-control ${errors.title && 'is-invalid'}`} 
                            placeholder='Title' />
                            {errors.title && <p className='invalid-feedback'>Title field id required</p>}
                        </div>
                        <div className="mb-3">
                            <label>Short Description</label>
                            <textarea cols="20" rows="10" className='form-control' {...register('shortdesc')}></textarea>
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <Editor 
                                containerProps={{ style: { height: '300px' } }} 
                                value={Description} 
                                onChange={onChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label>Image</label><br />
                            <input onChange={handlefilechange} type="file" />
                        </div>
                        <div className="mb-3">
                            <label>Author</label>
                            <input 
                                type="text" 
                                placeholder='Author'
                                {...register('author' , {required: true })} 
                                className={`form-control ${errors.author && 'is-invalid'}`} 
                            />
                            {errors.author && <p className='invalid-feedback'>Author field id required</p>}
                        </div>
                        <button className='btn btn-dark'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default blogpost