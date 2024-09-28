import { useState } from 'react'
import './App.css'
import EditPost from './components/Post/EditPost'
import AddPost from './components/Post/AddPost'
import GetPosts from './components/Post/GetPosts'
import { FormResType } from './CommonTypes'
import { Toaster } from 'react-hot-toast'
import { useTheme } from './providers/ThemeProvider'
import { CiDark,CiLight } from "react-icons/ci";

function App() {
  const [posts,setPosts]=useState<FormResType[]>([])
  const [id,setId]=useState<string>("");
  const { state, dispatch } = useTheme(); 
  
  return (
      <div style={{backgroundColor:state.theme==='light'?"white":"black",color:state.theme==='light'?"black":"white",width:"100vw",height:"100vh"}}>
        <Toaster />
        <div style={{position:"fixed",right:"10px",top:"10px"}}>
          {state.theme==="light"?<CiLight onClick={()=>dispatch({type:'TOGGLE_THEME'})}/>:<CiDark onClick={()=>dispatch({type:'TOGGLE_THEME'})}/>}
        </div>
        <h1 data-testid='appTitle'>cypress test</h1>
        <AddPost setPosts={setPosts} />
        <GetPosts posts={posts} setPosts={setPosts} setId={setId} />
        <EditPost id={id} posts={posts} setId={setId} setPosts={setPosts} />
    </div>
  )
}
export default App;

