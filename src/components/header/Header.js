import React,{useState,useEffect} from 'react'
import { auth } from '../firebase/firebase'
import {signOut} from 'firebase/auth'
import { Link,useNavigate } from 'react-router-dom'
const Header = () => {
const[signin,setSignin] = useState(false);
const[signupClicked,setSignupClicked] = useState(true)
const navigate = useNavigate();

 const user = auth.currentUser;
//console.log(user)
 
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
  return (
    <>
    <div className="navbar bg-neutral  ">
  <div className="flex-1">
    <Link to={"/"} className="btn btn-ghost text-xl w-16 p-0"><img src='./images/blog-logo.png' className='w-full '/></Link>
  </div>
  <div className="flex-none gap-2">
    {
      (user)?
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
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-2 shadow">
          
          <li><Link to={"/profile"} className="justify-between">Profile</Link></li>
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
