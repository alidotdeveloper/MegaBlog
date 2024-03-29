import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../appwrite/config";
import { parse } from 'dotenv';
import { useSelector } from 'react-redux';
import { Container, Button } from "../Components";

function post() {
  const [posts, setPosts] = useState(null);
  const [url, seturl] = useState('');
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector(state => state.auth.userData);
  

  
  useEffect(() => {
    console.log(userData.$id);
    console.log("details:",posts);

    const fetchpost = async() => {
      if(slug) {
        try {
          const post = await appwriteService.getPost(slug)
          if (post) {
            console.log("single post here", post);
            setPosts(post)
            
            console.log("posts id is : ", post.$id);
            try {
              const imageurl = await appwriteService.getFilePreview(post.feature_key)
              console.log(imageurl);
              seturl(imageurl)

            } catch (err){
              console.log("getting erorr in catch og getting imageurl", err);
            }
          } else {
            navigate('/')
          }
        }
        catch (err) {
          console.error('Error fetching post:', err);
          navigate('/');
        }
      }
    }
    fetchpost();
  }, [navigate, slug])
  const isAuthor = posts && userData ? posts.user_id === userData.$id : false
  const deletePost = async ({ postid }) => {
    console.log("Deleting post:", postid);
  
    try {
      // Log the document details before attempting deletion
      const existingPost = await appwriteService.getPost(postid);
      console.log("Existing post details:", existingPost);
  
      // Proceed with deletion
      const delPost = await appwriteService.deletePost({ postid });
      if (delPost) {
        appwriteService.deleteImage(postid);
        navigate('/');
      }
    } catch (error) {
      console.error("Error while deleting post:", error);
    }
  };

  return posts ? (
    <div className='py8'>
     
      <Container>
        <div className=' flex justify-center mb-4 relative border rounded-xl p-2 content-center object-center w-full '>
          <img
            src={url}
            alt={posts.TITLE}
            className="rounded-xl w-{s} "
          />
          {  isAuthor&& (<div className='absoulte right-6 top-6'>
            
            <Button className='mr-3' bgColor="bg-red-500" >
            <Link to={`/edit-post/${posts.$id}`} >
              Edit </Link>
            </Button>
            <Button bgColor="bg-red-500" onClick={() => { deletePost({ postid:slug })} }  >
              Delete
            </Button>
          </div> 
          )}

        </div>
        <div className='w-full mb-6'>

          <h1 className='text-2xl font-bold'> {posts.TITLE}</h1>
          <div className='broswer-css'> {posts.CONTENT} </div>

        </div>
        
      </Container>

    </div>
  )
: null;
    
  }


export default post