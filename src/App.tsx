import { useState } from 'react'
import './App.css'
import EditPost from './components/Post/EditPost'
import AddPost from './components/Post/AddPost'
import GetPosts from './components/Post/GetPosts'
import { FormResType } from './CommonTypes'
import { Toaster } from 'react-hot-toast'
// import { useTheme } from './providers/ThemeProvider'
import { CiDark,CiLight } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux'

import { toggleTheme } from './features/ThemeSlice'
import { RootState } from './store'

function App() {
  const [posts,setPosts]=useState<FormResType[]>([])
  const [id,setId]=useState<string>("");
  //const { state, dispatch } = useTheme(); 
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  return (
      <div data-testid="appContainer" style={{backgroundColor:theme==='light'?"white":"black",color:theme==='light'?"black":"white",width:"100vw",height:"100vh"}}>
        <Toaster />
        <div style={{position:"fixed",right:"10px",top:"10px"}}>
          {theme==="dark"?
            <CiLight style={{color:"rgb(153,153,0)",fontSize:"40px"}} onClick={() => dispatch(toggleTheme())} />:
            <CiDark style={{color:"black",fontSize:"40px"}} onClick={() => dispatch(toggleTheme())} />}
        </div>
        <h1 data-testid='appTitle'>cypress test</h1>
        <AddPost setPosts={setPosts} />
        <GetPosts posts={posts} setPosts={setPosts} setId={setId} />
        <EditPost id={id} posts={posts} setId={setId} setPosts={setPosts} />
    </div>
  )
}
export default App;

