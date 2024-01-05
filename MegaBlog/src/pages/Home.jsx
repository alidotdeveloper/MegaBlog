import React, { useEffect, useState } from 'react'
import { Container} from '../Components'
import appwriteService from "../appwrite/config";
import PostCard from '../Components/Essentials/postCard';

function Home() {
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        appwriteService.getPosts(([])).then((post) => {
            console.log("post",post)
            if (post) {
                console.log("post get sucessfully");
                setPosts(post.documents)
            } else {
                console.log("no post recived")
            } 
        }).catch(err => {
            console.error(`Error getting posts: ${err}`);
        })
    }, [])
    
    if (posts?.length === 0) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className="text-4xl font-bold hover:text-gray-500">Login to read posts</h1>
                    </div>
                    </div> 
            </Container>    
            </div>  
    )
    }
    return (
        <div className='w-full y-8'>
            <div className='flex flex-wrap'>
                {posts?.map((post) => (
                    <div key={post.id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
        </div>

        </div>
    )

}

export default Home