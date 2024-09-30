import React,{useState} from 'react'
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {

const[email,setEmail] = useState("")
const [password,setPassword] = useState("")
const[error,setError] = useState("")
 const navigate = useNavigate();
function handleLogin(){
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    
      navigate("/")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(` ${errorMessage}`)
    console.log(errorMessage,errorCode)
  });
setEmail("")
setPassword("")
}
  return (
    <>
    <div className='w-1/2 border-2 border-black p-8 m-auto mt-12 bg-gray-300 '>
 <div className=' text-center mb-8'>
 <h1 className='text-4xl'>Signin</h1>
 </div>
    <div>
  <label className="input w-2/3 input-bordered border-black flex items-center gap-2 mb-4 m-auto">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70">
      <path
        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
      <path
        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
    </svg>
    <input type="text" className=" w-1/2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
  </label>
  
  <label className="input w-2/3 input-bordered border-black flex items-center gap-2 m-auto mb-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70">
      <path
        fillRule="evenodd"
        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
        clipRule="evenodd" />
    </svg>
    <input type="password" className="grow"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </label>
  <p className='text-center text-red-500 mb-4'>{error}</p>
  <button className="btn btn-active btn-neutral w-2/3 m-auto flex items-center gap-2 mb-4" onClick={handleLogin}>Signin</button>
  
  </div>
  </div>
  </>
  )
}

export default Login