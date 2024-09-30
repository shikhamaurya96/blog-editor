import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
const Home = () => {
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();
      useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsAuthenticated(true)
            }
            else{
                setIsAuthenticated(false)
            }
            setLoading(false)
        })
      },[])
    const handleBlogCreation = ()=>{
    
        if(isAuthenticated){
        navigate("/editor")
        }
        else{
            navigate("/signin")
        }
    }
    if(loading){
       return <div className='flex justify-center'><span className="loading loading-spinner loading-md  "></span></div>
    }
  return (
    <div className="card bg-base-100 image-full w-screen h-screen shadow-xl">
  <figure>
    <img
      src="./images/cooking.jpg"
      alt="cooking" className='w-full'/>

  </figure>
  <div className="card-body mx-auto">
    <div className='mx-auto'>
  <h1 className="card-title text-5xl ">Publish your passions, your way</h1>
    <p className='text-2xl text-center mt-4'>Create a unique and beautiful blog easily.</p>
    <div className=' text-center mt-8'>
    <button className=' bg-orange-500 p-2 text-bold ' onClick={handleBlogCreation}>CREATE YOUR BLOG</button>
    </div>
    
    </div>
  </div>
</div>
  )
}

export default Home