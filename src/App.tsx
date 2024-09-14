import { useState } from 'react'
import './App.css'
import EditPost from './components/EditPost'
import AddPost from './components/Post/AddPost'
import GetPosts from './components/Post/GetPosts'
import { FormResType } from './CommonTypes'
import { Toaster } from 'react-hot-toast'

function App() {
  const [posts,setPosts]=useState<FormResType[]>([])
  const [id,setId]=useState<string>("");
  return (
      <div>
        <Toaster />
       <h1>cypress test</h1>
       <AddPost setPosts={setPosts} />
       <GetPosts posts={posts} setPosts={setPosts} setId={setId} />
       <EditPost id={id} posts={posts} />
    </div>
  )
}

export default App


{/* <div class="go4109123758" style="left: 0px; right: 0px; display: flex; position: absolute; transition: 230ms cubic-bezier(0.21, 1.02, 0.73, 1); transform: translateY(0px); top: 0px; justify-content: center;">
  <div class="go2072408551" style="animation: 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards running go3223188581;">
    <div class="go685806154">
      <div class="go1858758034"></div>
        <div class="go1579819456">
          <div class="go2534082608"></div>
        </div>
      </div>
      <div role="status" aria-live="polite" class="go3958317564">Network error:Network Error</div>
  </div>
</div> */}
