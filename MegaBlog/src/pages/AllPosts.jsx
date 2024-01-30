import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../Components/index';

function AllPost() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await appwriteService.getPosts([]);
        if (result) {
          console.log("post of all are here:",result.documents);
          setPosts(result.documents);
        }
      }
      catch (err){
        alert("An error occurred while loading the posts", err);
      }
     
    }
    fetchData();
    
      }, [])
  
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard post={post} fileId={post.feature_key} id={post.$id} title={post.TITLE} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPost