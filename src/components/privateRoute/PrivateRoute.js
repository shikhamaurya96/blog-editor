import React,{useState,useEffect} from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const PrivateRoute = () => {
    const [loading,setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(()=>{
        //set up the firebse listener
      const unsubscribe = onAuthStateChanged(auth,(user)=>{
        if(user){
            setIsAuthenticated(true) //user is authenticated
           
        }
        else{
            setIsAuthenticated(false) //user is not authenticated
        }
        setLoading(false)
      })
  // cleanup the listener on component unmount
  return ()=>{
    unsubscribe();
  }
    },[])

if(loading) {
return <div className='flex justify-center'><span className="loading loading-spinner loading-md  "></span></div>
}

  return (
   isAuthenticated?<Outlet/>:<Navigate to={"/signin"}/>
    
  )
}

export default PrivateRoute