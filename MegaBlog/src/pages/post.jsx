import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../appwrite/config";
import { parse } from 'dotenv';
import { useSelector } from 'react-redux';
import { Container, Button } from "../Components";

function post() {
  const [posts, setPosts] = useState('');
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector(state => state.auth.userData);
  const isAuthor = posts && userData? posts.userId === userData.$id :false
  useEffect(() => {
    const fetchpost = async() => {
      if(slug) {
        try {
          const post = await appwriteService.getPost(slug)
          if (post) {
            setPosts(post)
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
  
  const deletePost = ((postId) => {

    const delPost = appwriteService.deletePost(posts.$id)
    if (delPost) {
      appwriteService.deleteImage(postId)
      navigate('/');
    }
  })

  return posts ? (
    <div className='py8'>
     
      <Container>
        <div className='"w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img
            src={appwriteService.getFilePreview(posts.$id)}
            alt={ posts.TITLE}
            className="rounded-xl"
          />

          {isAuthor && (<div className='absoulte right-6 top-6'>
            <Link to={`/edit/${posts.Id}`} />
            <Button className='mr-3' bgColor="bg-red-500">
              Edit
            </Button>
            <Button bgColor="bg-red-500" onClick={deletePost} >
              Delete
            </Button>
          </div> 
          )}

        </div>
        <div className='w-full mb-6'>

          <h1 className='text-2xl font-bold'> {posts.title}</h1>
          <div className='broswer-css'> {posts.content} </div>

        </div>
        
      </Container>

    </div>
  )
: null;
    
  }


export default post