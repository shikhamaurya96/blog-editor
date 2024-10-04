import React,{useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { collection,query,where,getDocs,doc, deleteDoc,getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useDispatch } from 'react-redux'
import { setTitleState,setContentState } from '../store/editorSlice'
const MyBlog = () => {
const[loading,setLoading] = useState(true)
const[isAuthenticated,setIsAuthenticated] = useState(false)
const[postsData,setPostsData] = useState(null)
const {option} = useParams();
const navigate = useNavigate();
const dispatch = useDispatch()
useEffect(()=>{
onAuthStateChanged(auth,(user)=>{
    if(user){
        setIsAuthenticated(true)
        if(option=="published"){
        fetchPost(user.uid,true);
        }
        else if(option==="draft"){
            fetchPost(user.uid,false)
        }
        
    }
    else{
        setIsAuthenticated(false)
    }
    setLoading(false)
})
},[option]);
const fetchPost = async(userId,published)=>{
  const q = query(collection(db, "blog"), where("uid", "==", userId),where("published","==",published));
  const querySnapshot = await getDocs(q);
  
 const postList = querySnapshot.docs.map((d)=>d.data());
  setPostsData(postList);
   console.log(postList)
}

const handleDelete = async(postId,uid)=>{
  try{
  const docRef = doc(db,"blog",postId)
 await deleteDoc(docRef);
fetchPost(uid,option)
  }
  catch(err){
    console.log("error",err.message)
  }
}
const handleView = (postId)=>{
   navigate(`/post/${postId}`)
}
const handleEdit = async(postId,uid)=>{
    try{
      //const postId = location.state
      if(postId){
      const docRef = doc(db,"blog",postId);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        const data = docSnap.data()
         dispatch(setTitleState(data.title));
       dispatch(setContentState(data.content))
  
      }
      }
    }
    catch(err){
      console.log("error",err)
    }
     navigate("/editor")
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
         {(option==="published")?<button className="btn btn-neutral" onClick={()=>handleView(doc.id)}>View</button>:<button className="btn btn-neutral" onClick={()=>handleEdit(doc.id,doc.uid)}>Edit</button>}
       </div>
       <p>Posted on : {doc.timestamp.toDate().toLocaleDateString("en-US",{
        year: 'numeric',
        month: 'long',
        day: 'numeric',
       })}</p>
     </div>
   </div>):<><img className='w-24 mx-auto mt-20' src='../images/pencilScissor.png'/><p className='  text-center'>No posts</p><p className='text-center text-sm'>Posts that you create will show up here </p></>
      }
    </div>
  
  )
}

export default MyBlog