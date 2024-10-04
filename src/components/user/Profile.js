import React,{useState,useEffect} from 'react'
import { auth, storage } from '../firebase/firebase'
import { ref,getDownloadURL,uploadBytes } from 'firebase/storage'
import { updateProfile,onAuthStateChanged } from 'firebase/auth'
const Profile = () => {
    //const[image,setImage] = useState("https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp")
    // const[user,setUser] = useState(auth.currentUser);
    const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [loading,setLoading] = useState(true)
  const [user,setUser] =  useState(null)
    
    useEffect(()=>{
        onAuthStateChanged(auth,(myUser)=>{
          if(myUser){
            setUser(myUser)
            setIsAuthenticated(true)
          }
          else{
            setIsAuthenticated(false)
          }
      setLoading(false)
        })
      },[])
console.log(user);
   async function updatePicture(e){  
    try{ 
  const file = e.target.files[0]
  if(file){
    const storageRef = ref(storage,`profilePhotos/${user.uid}`)
const snapshot = await uploadBytes(storageRef,file)
 const downloadUrl = await getDownloadURL(snapshot.ref)
        //setImage(downloadUrl)
       await updateProfile(user,{
            photoURL:downloadUrl
        })
        await user.reload();
   
  }
  else{
    return
  }}
  catch(error){
    console.log("picture upload error",error)
  }
    }
    if(loading){
        return <div className='flex justify-center'><span className="loading loading-spinner loading-md  "></span></div>
    }
  return(
    isAuthenticated?( <div className='border-2 p-4 w-1/2 flex m-4 bg-slate-300 mx-auto'>
<div className=' w-36'>
<div className="avatar">
  <div className="w-24 rounded-full">
    <img src={(user && user.photoURL)?user.photoURL:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} /> 
  </div>
    </div> 
    <div className='mt-4'>
    <label htmlFor='input-file' className='border-2 border-black p-2 bg-orange-400 text-white' >Update Profile</label><br/>
    <input type='file' id='input-file' className='mt-6 ml-8 invisible' onChange={updatePicture}/>
    </div>
    
</div>
<div className=' ml-16 w-max'>
<p>Name : {user.displayName}</p>
<p>Email : {user.email} </p>
</div>
    </div>):<p>user is not authenticated</p>
  )
}

export default Profile