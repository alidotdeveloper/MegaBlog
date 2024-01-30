import React, { useEffect, useState } from 'react'
import appwriteservice from "../../appwrite/config";
import { Link } from 'react-router-dom';

function postCard({ id, title, fileId }) {
    const [ url, seturl] = useState('')
    useEffect(() => {
        const getFilePreview = async () => {
            try { 
                const geturl = await appwriteservice.getFilePreview(fileId)
                if (geturl) {
                    seturl(geturl);
                }

            } catch (error) {
                console.log("getting error while previewing", error);
            }
          
        }
        getFilePreview();
    }, [fileId]);
  
    return (
        <Link to={`/post/${id}`}>
            <div className={`className w-full bg-gray-100 rounded-xl p-4`}>
                <div className='w-full justify-center mb-4'>
                    <img src={ url} alt={title} className='rounded-xl'></img>
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
        </div>
        </Link>
    
)
}

export default postCard