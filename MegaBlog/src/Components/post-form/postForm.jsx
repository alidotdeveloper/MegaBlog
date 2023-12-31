import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from "../index";
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
                    const file = data.image[0] ? AppwriteService.uploadImage(data.image[0]) : null
                    
                    if (file) {
                        const fileId = file.$id
                        data.featuredImage = fileId
                        const dbPost = await AppwriteService.createPost({
                            ...data,
                            userId: userData.$id
                        })
                        if (dbPost) {
                            navigate(`/post/${dbPost.$id}`)
                        }
                    }
        
                }
                
            }
            
        }
    }

    const slugGenerate = useCallback((value) => {

        if( value && typeof value == "string" ) {

           return value
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '')
        
            
        }
            return '';
    }, [])


    useEffect(() => {
        const subscription = watch((value, { name })=> {
            if (name === "title") {
                setValue('slug', slugGenerate(value.title, { shouldvalidate: true }))
            }
        })
        return () => {
            subscription.unsubscribe();
        }
    }, [slugGenerate,value,setValue])

    

  return (
      <form className='flex flex-wrap'>
          <div className='w-2/3 px-2'>
              <Input
                  label="Title:"
                  placeholder="Title"
                  className="mb-4"
                  {...register("title", { required: 'Please enter a title' })}
              />
              <Input
                  label="Slug:"
                  placeholder="Slug"
                  className="mb-4"
                  {...register, { required: true }}
                  onInput={(e) => {
                      setValue("slug", slugGenerate(value.title), {shouldValidate:true})
                      
                  }}
              />
              <RTE
                  label="Content"
                  control={{ control }}
                  name="content"
                  defaultvalue={getValues("content")}
              />
              <div className='w-1/3 px-2'>
                  <Input
                      label="Feature Image"
                      type="file"
                      className="mb-4"
                      accept="image/png, image/jpg, image/jpeg, image/gif"
                      {...register("image"), { required: !post }}
                  />
                  {post && (
                      <div className='w-full mb-4'>
                           <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />  

                      </div>
                  )}
                  <select
                      option={["active", "inactive"]}
                      label="Status" className='mb-4'
                      {...register("status", { required: true })}>
                  </select>
                  <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" >{post? "Update" : "Submit" }</Button>

              </div>
             
          </div>
          
      </form>
  )
}

export default postForm