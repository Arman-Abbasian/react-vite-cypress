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
