import axios from "axios"
import { useEffect, useState } from "react"
import { FormResType } from "../../CommonTypes"



function GetPosts() {
    const [posts,setPosts]=useState<FormResType[]>([])
    useEffect(()=>{
        axios.get("http://localhost:4000/posts").then(res=>{
          console.log(res)
        setPosts(res.data)
        }).catch((err)=>console.log(err))
    },[])
  return (
    <div>
      <h1>posts</h1>
      <ul>
        {posts.map((item)=>{
          return <li key={item.id}>{item.title}</li>
        })}
      </ul>
    </div>
  )
}
export default GetPosts