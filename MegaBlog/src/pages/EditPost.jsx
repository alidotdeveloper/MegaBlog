import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { PostForm } from '../Components';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'postcss';
import { data } from 'autoprefixer';


function EditPost() {
    const [posts, setposts] = useState([]);
    const { slug } = useParams
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((data) => {
           
                if (data) {
                    setposts(data)
                } else {
                    navigate('/')
                }
                
            })
        }
    }, [slug, navigate])
    
    return data ? (
        <div className='py-8'>
            <Container>
                <PostForm post={data} />
    </Container>
</div>) : null


}

export default EditPost