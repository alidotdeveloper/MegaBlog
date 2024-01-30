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
  const isAuthor = posts && userData? posts.userId === userData.$id :false
  useEffect(() => {
    const fetchpost = async() => {
      if(slug) {
        try {
          const post = await appwriteService.getPost(slug)
          if (post) {
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
  
  const deletePost = ((postId) => {

    const delPost = appwriteService.deletePost(posts.feature_key)
    if (delPost) {
      appwriteService.deleteImage(postId)
      navigate('/');
    }
  })

  return posts ? (
    <div className='py8'>
     
      <Container>
        <div className=' flex justify-center mb-4 relative border rounded-xl p-2 content-center object-center w-full '>
          <img
            src={url}
            alt={posts.TITLE}
            className="rounded-xl w-{s} "
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

          <h1 className='text-2xl font-bold'> {posts.TITLE}</h1>
          <div className='broswer-css'> {posts.CONTENT} </div>

        </div>
        
      </Container>

    </div>
  )
: null;
    
  }


export default post