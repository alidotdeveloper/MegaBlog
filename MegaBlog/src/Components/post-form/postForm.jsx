import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AppwriteService  from "../../../src/appwrite/config";

function postForm({post}) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    });
    const navigate = useNavigate();
    const userData = useSelector((state )=> state.auth.userData || {} ) ;
    const submit = async (data) => {
        if (post) {
           
            const file = data.image[0] ? await AppwriteService.uploadImage(data.image[0]) : null;
            console.log(file);
          
            if (file) {
                AppwriteService.deleteImage(post.featuredimage);
            }

            const dbPost = await AppwriteService.updatePost(post.$id, {
               
                ...data,
                feature_key: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await AppwriteService.uploadImage(data.image[0]);

            if (file) {
                console.log(file)
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await AppwriteService.createPost({ ...data,fileId, userId: userData.$id });
                
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                    console.log("posts crteated successfully")
                } 
                else(err)=> {
                    alert('Something went wrong while creating the post', err);
                }
            } 
        }
    };
    
    const slugGenerate = useCallback((value) => {

            if (value && typeof value == "string") {

                return value
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]+/g, '')
        
            
            }
            return '';
        }, [])
    

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                const slugValue = value.title ? slugGenerate(value.title) : '';
                setValue('slug', slugValue, { shouldvalidate: true });
            }
           
        })
        return () => {
            subscription.unsubscribe();
        }
    }, [slugGenerate,watch,setValue])

    

  return (
      <form className='flex flex-wrap' onSubmit={handleSubmit(submit)}>
          <div className='w-2/3 px-2'>
              <Input
                  label="Title:"
                  placeholder="Title"
                  className="mb-4"
                  {...register("title", { required: true })}
              />
              <Input
                  label="Slug:"
                  placeholder="Slug"
                  className="mb-4"
                  {...register("slug", { required:true })}
                  onInput={(e) => {
                      setValue("slug", slugGenerate(e.currentTarget.value), {shouldValidate:true})
                      
                  }}
              />
              <RTE
                  label="Content :"
                  className= "inline-block mb-1 pl-1 text-black"
                  control={ control }
                  name="content"
                  defaultValue={getValues("content")}
              />
              </div>
       
              <div className='w-1/3 px-2'>
                  <Input
                      label="Feature Image"
                      type="file"
                      className="mb-4"
                      accept="image/png, image/jpg, image/jpeg, image/gif"
                      {...register("image", { required: !post })}
                  />
                  {post && (
                      <div className='w-full mb-4'>
                           <img
                            src={AppwriteService.getFilePreview(post.$id)}
                            alt={post.title}
                            className="rounded-lg"
                        />  

                      </div>
                  )}
                  <Select
                      options={["active", "inactive"]}
                      label="Status" className='mb-4 px-4.5 py-2.5 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 '
                      {...register("status", { required: true })}>
                  </Select>
                  <Button type="submit"  bgColor={post ? "bg-green-500" : undefined} className="w-full" >{post? "Update" : "Submit" }</Button>

              </div>
             
      
          
      </form>
  )
}

export default postForm