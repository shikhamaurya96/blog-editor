import React,{useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { collection,query,where,getDocs,doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
const MyBlog = () => {
const[loading,setLoading] = useState(true)
const[isAuthenticated,setIsAuthenticated] = useState(false)
const[postsData,setPostsData] = useState(null)
const {option} = useParams();
const navigate = useNavigate();
useEffect(()=>{
onAuthStateChanged(auth,(user)=>{
    if(user){
        setIsAuthenticated(true)
        if(option=="published"){
        fetchPublishedPost(user.uid);
        }
        else if(option==="draft"){
          
        }
        
    }
    else{
        setIsAuthenticated(false)
    }
    setLoading(false)
})
},[]);
const fetchPublishedPost = async(userId)=>{
  const q = query(collection(db, "blog"), where("uid", "==", userId));
  const querySnapshot = await getDocs(q);
  
 const postList = querySnapshot.docs.map((d)=>d.data());
  setPostsData(postList);
   console.log(postList)
}

const handleDelete = async(postId,uid)=>{
  try{
  const docRef = doc(db,"blog",postId)
 await deleteDoc(docRef);
fetchPublishedPost(uid)
  }
  catch(err){
    console.log("error",err.message)
  }
}
const handleView = (postId)=>{
   navigate(`/post/${postId}`)
}
if(loading){
    return <div className='flex justify-center'><span className="loading loading-spinner loading-md  "></span></div>
}
  return (
  
    <div className=' mt-12'>
      {
        
        (isAuthenticated)&&(postsData?.length!==0)?postsData?.map((doc)=><div className="card border-2 mb-4  w-1/2 mx-auto ">
     <div className="card-body">
       <h2 className="card-title"> Title!</h2>
       <p>{doc.title}</p>
       <div className="card-actions justify-end">
        <button className='btn btn-neutral' onClick={()=>handleDelete(doc.id,doc.uid)}>Delete</button>
         <button className="btn btn-neutral" onClick={()=>handleView(doc.id)}>View</button>
       </div>
     </div>
   </div>):<><img className='w-24 mx-auto mt-20' src='../images/pencilScissor.png'/><p className='  text-center'>No posts</p><p className='text-center text-sm'>Posts that you create will show up here </p></>
      }
    </div>
  
  )
}

export default MyBlog