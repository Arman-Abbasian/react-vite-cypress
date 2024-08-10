import { useState } from 'react'
import './App.css'
import EditPost from './components/EditPost'
import AddPost from './components/Post/AddPost'
import GetPosts from './components/Post/GetPosts'
import { FormResType } from './CommonTypes'

function App() {
  const [posts,setPosts]=useState<FormResType[]>([])
const [id,setId]=useState<string>("");
  return (

      <div>
       <h1>cypress test</h1>
       <AddPost />
       <GetPosts posts={posts} setPosts={setPosts} setId={setId} />
       <EditPost id={id} posts={posts} />
    </div>
  )
}

export default App
