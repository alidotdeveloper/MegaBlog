import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { PostForm } from '../Components';
import { useNavigate, useParams } from 'react-router-dom';
import Container  from '../Components/container/container';
import { data } from 'autoprefixer';


function EditPost() {
    const [posts, setposts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("value of slug is",slug)
        try {
            if (slug) {
       
                 appwriteService.getPost(slug).then((post) => {
               
                    if (post) {
                        console.log("edit posts data:", slug);
                        setposts(post)
                    } else {
                        navigate('/')
                        console.log("edit posts data not vailable");
                    }
                    
                })
            }
            
        } catch (error) {
            console.log("error while getting post id", error)
            
        }
       
    }, [slug, navigate])
    
    return data ? (
        <div className='py-8'>
            <Container>
                <PostForm post = {posts} />
    </Container>
</div>) : null


}

export default EditPost