import React, { useEffect, useState } from 'react'
import { Container, postCard } from '../Components'
import appwriteService from "../appwrite/config";

function Home() {
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        appwriteService.getPosts(([])).then((post) => {
            if (post) {
                setPosts(post.documents)
            } 
        })
    }, [])
    
    if (posts.length === 0) {
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
                {posts.map((post) => (
                    <div key={post.id} className='p-2 w-1/4'>
                        <postCard {...post} />
                    </div>
                ))}
        </div>

        </div>
    )

}

export default Home