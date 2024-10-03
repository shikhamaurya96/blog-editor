import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import MyEditor from "./components/editor/MyEditor";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Signup from "./components/user/Signup";
import Login from "./components/user/Login";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Profile from "./components/user/Profile";
import Post from "./components/blog-post/Post";
import MyBlog from "./components/blog-post/MyBlog";
function App() {
  //console.log(process.env.REACT_APP_FIREBASE_API_KEY)

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>,
          
        },
        {
        path:"/editor",
        element:<PrivateRoute/>,
        children:[
          {
            path:"",
            element:<MyEditor/>
          },
          
          
        ]
        },
       
       {
        path:"/signup",
        element:<Signup/>
       },
       
       {
        path:"/signin",
        element:<Login/>
       },
       {
        path:"/profile",
        element:<Profile/>
       },
       {
        path:"/blogs/:option",
        element:<MyBlog/>
      },
      {
        path:"/post/:id",
        element:<Post/>
      }
      ]
    },

  ])
  return (
    <>
    <RouterProvider router={router}/>
    
    </>
  );
}

export default App;
