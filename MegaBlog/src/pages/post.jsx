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

    const isAuthor = posts && userData?.posts.userId === userData.$id;
    useEffect(() => {
        
    }, [])
  return (
    <div>post</div>
  )
}

export default post