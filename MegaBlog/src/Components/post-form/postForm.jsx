import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, input, Select, RTE } from "../index";
import { useDispatch, useSelector } from 'react-redux';
import AppwriteService from "../../appwrite/auth";
import { useNavigate } from 'react-router-dom';


function postForm() {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status|| "active"
        
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.user.userData);

    const submit = async (data) => {
        if (post) {

            const file = data.image[0] ? AppwriteService.uploadImage(data.image[0]) : null
            
            if (file) {
                AppwriteService.deleteImage(post.featuredImage);

                const dbPost = AppwriteService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
        } else {
                    
        
                }
                
            }
            
        }
    }

  return (
    <div>postForm</div>
  )
}

export default postForm