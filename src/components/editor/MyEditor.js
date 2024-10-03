import React,{useState,useRef,useEffect} from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { collection,doc,getDoc,addDoc ,updateDoc} from 'firebase/firestore'
import { auth, db} from '../firebase/firebase'
import { getStorage,ref, uploadBytes, getDownloadURL  } from 'firebase/storage'
import EditorHtmlRenderer from './EditorHtmlRenderer'
import { useNavigate,useParams } from 'react-router-dom'
import { setTitleState,setContentState } from '../store/editorSlice'
import { useDispatch,useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
const MyEditor = () => {
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [loading,setLoading] = useState(true)
  const [uploadedImage,setUploadedImage] = useState(null) //for storing uploaded image url
  const [previewTitle,setPreviewTitle] = useState(null)
  const [previewContent,setPreviewContent] = useState(null)
  const editorRef = useRef()
   const dispatch = useDispatch()
   const navigate = useNavigate();
   const {id}=  useParams()
   const {title,myContent} = useSelector((state)=>state.editor)
   console.log(title)
   const content = myContent.newContent
   //console.log(content)
    const myUser = auth.currentUser;
    console.log(myUser)
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

//after clicking edit button i want to show the content on editor so that we can edit it
// useEffect(()=>{
// const fetchPost = async()=>{
//   try{
//     const postRef = doc(db,"blog",id);//reference the document by its id
//     const postSnap = await getDoc(postRef); //fetch the document
//     if(postSnap.exists()){
//       const data = postSnap.data()
//       dispatch(setContentState(data.content))
//     }
//   }
//   catch(err){
//     console.log(err.message)
//   }
// }
// fetchPost()
// }
// ,[])

const handleEditorChange = (newContent)=>{
  dispatch(setContentState({newContent}))
}


  const uploadHandler = (blobInfo, progress)=>new Promise((resolve, reject) =>{
    const file =  blobInfo.blob();
    const storage = getStorage();
    const storageRef = ref(storage, 'blog')
    
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setUploadedImage(downloadURL)
        console.log('File available at', downloadURL);
        resolve(downloadURL);
        if(editorRef.current){
          editorRef.current.insertContent('<br/>');
        }
      });
    }).catch((e)=>{
      reject(e)
    });

  });
  
  
  
const handlePreview =()=>{

setPreviewTitle(title)

 //console.log(content)
//const textContent =  previewContentRef.current.appendChild(newContent)
  setPreviewContent(content)
}
 const handlePost = async()=>{
try{
  const collectionRef = collection(db,"blog");
  const docRef = await addDoc(collectionRef,
    {
   uid:myUser.uid,   
  title:title,    
  content:content,
  image :uploadedImage,
  timestamp:new Date(),
  type:"blog"
  });
  await updateDoc(docRef,{
    id:docRef.id
  })

 console.log(docRef.id) 
 navigate(`/post/${docRef.id}`)

}
catch(error){
  console.log("error",error)
}
 }
 if(loading){
  return <div className='flex justify-center'><span className="loading loading-spinner loading-md  "></span></div>
 }
  return ( isAuthenticated)?<div className='flex'>
    <div className='w-full h-full relative'>
      <div>
        <input type='text' placeholder='Title' value={title} className='mb-2 border-2 p-2 outline-none w-full' onChange={(e)=>dispatch(setTitleState(e.target.value))}/>
      </div>
      
    <Editor
     value={content}
      apiKey='6ro1ganxtyjdry6t327x2njgmzq5wh752asqxr3e9ci4393j'
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        height:600,
        
        plugins: [
          // Core editing features
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Sep 30, 2024:
          
        ],
        toolbar: 'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | image',
            branding:false,
        images_upload_handler:uploadHandler,
        automatic_uploads:true,
      
      }}
      onEditorChange={handleEditorChange}
    />
    
    
    <div className='flex justify-end mr-8'>
    <button className="btn btn-active btn-neutral mr-2 mt-2" onClick={handlePreview}>Preview</button> 
    <button className="btn btn-active btn-neutral mt-2" onClick={handlePost}>Publish</button>
    
    </div>
    
    </div>
    {
      (previewTitle||previewContent) && <div className='w-1/2 border-2 mt-12'><EditorHtmlRenderer title={title} content ={content}/></div>
    }
    
    </div>
  :<p>failed to fetch data</p>
}

export default MyEditor