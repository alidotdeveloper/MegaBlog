import React from 'react'
import appwriteservice from "../../appwrite/config";
import { Link } from 'react-router-dom';

function postCard({id,title,featureImage}) {
    return (
        <Link to={`/post/${id}`}>
            <div className={`${className} w-full bg-gray-100 rounded-xl p-4`}>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteservice.getFilePreview(featureImage) } alt={title} className='rounded-xl'></img>
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
        </div>
        </Link>
    
)
}

export default postCard