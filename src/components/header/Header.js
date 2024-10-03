import React,{useState,useEffect} from 'react'
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import {signOut} from 'firebase/auth'
import { Link,useNavigate } from 'react-router-dom'
const Header = () => {
const[signin,setSignin] = useState(false);
const[signupClicked,setSignupClicked] = useState(true)
const [isAuthenticated, setIsAuthenticated] = useState(false);
//const[loading,setLoading] = useState(true)
const[option,setOption] = useState(null)
    useEffect(()=>{
        //set up the firebse listener
      const unsubscribe = onAuthStateChanged(auth,(user)=>{
        if(user){
            setIsAuthenticated(true) //user is authenticated
           
        }
        else{
            setIsAuthenticated(false) //user is not authenticated
        }
        
      })
  // cleanup the listener on component unmount
  return ()=>{
    unsubscribe();
  }
    },[])
const navigate = useNavigate();
const user = auth.currentUser;
 
const handleLogout = ()=>{
signOut(auth)
.then(()=>{
  
  setSignin(false)
  navigate("/signin")
}).catch((error)=>{
console.log("error loging out",error)
});

}

const handleSignup = ()=>{
  navigate("/signup")
  setSignupClicked(false)
}
const handleSelectOption = (e)=>{
  const value = e.target.value
  setOption(value)
  
 if(value=="published"){
  navigate(`/blogs/${value}`)
 }
 else if(value=="draft"){
  navigate(`/blogs/${value}`)
 }
}
console.log(option)

  return (
    <>

    <div className="navbar bg-neutral sticky top-0 z-50">
  <div className="flex-1">
    <Link to={"/"} className="btn btn-ghost text-xl w-16 p-0"><img src='../images/blog-logo.png' className='w-full '/></Link>
  </div>
  
  <select className='p-2 mr-4' value={option} onChange={handleSelectOption}>
    <option value="" disabled selected>Post</option>
    <option value="published">Published</option>
    <option value="draft">Draft</option>
    
  </select>
  <div className="flex-none gap-2">
    {
      (isAuthenticated)?
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={(user.photoURL)?user.photoURL:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-white text-black  rounded-box z-40 mt-3 w-52 p-2 shadow absolute">
          
          <li className="justify-between"><Link to={"/profile"} >Profile</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>:<button onClick={handleSignup} className={signupClicked?"p-2 bg-white text-black rounded-md":""}>{signupClicked?"Signup":""}</button>
}
  </div>
</div>
    </>
  )
}

export default Header
