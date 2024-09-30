import React,{useState,useEffect} from 'react'
import { collection, doc,getDoc } from 'firebase/firestore'
import EditorHtmlRenderer from '../editor/EditorHtmlRenderer'
import { useParams,useNavigate } from 'react-router-dom'
import { db } from '../firebase/firebase'
const Post = () => {
const [post,setPost] = useState(null);
//const [content,setContent] = useState(null);
const [ error,setError ] = useState(null);
const [loading,setLoading] = useState(true)
const {id} = useParams();
//console.log(param)
const navigate = useNavigate()
useEffect(()=>{
    const fetchPost = async()=>{
        try{
      const postRef = doc(db,"blog",id);//reference the document by its id
      const postSnap = await getDoc(postRef); //fetch the document
      if(postSnap.exists()){
        console.log(postSnap.data())
        setPost(postSnap.data())
      }
      else{
        setError("no such document!")
      }
        }
        catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    if(id){
        fetchPost(); // Fetch the post only if postId is available
    }
},[id]) // Dependency array ensures the fetch runs when postId changes
console.log(post)
const handleEdit = ()=>{
navigate("/editor")
}

if(loading){
    return <div className='flex justify-center'><span className="loading loading-spinner loading-md  "></span></div>
}
if(error){
    return <div>Error : {error}</div>
}
  return (
    <div className='bg-slate-300 w-full  p-12'>
        <div className='float-right'><button className="btn btn-neutral" onClick={handleEdit}>Edit</button></div>
    <div className='w-2/3  mx-auto bg-white shadow-xl h-full'>
     {
        post? (<EditorHtmlRenderer title={post.title} content={post.content}/>) : <p>Post not found</p>
     }
     </div>
    </div>
  )
}

export default Post