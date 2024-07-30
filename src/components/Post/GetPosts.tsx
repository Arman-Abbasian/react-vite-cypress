import axios from "axios"
import { useEffect, useState } from "react"
import { FormResType } from "./AddPost"


function GetPosts() {
    const [posts,setPosts]=useState<FormResType>([])
    useEffect(()=>{
        axios.get("http://localhost:4000/posts").then(res=>{
        setPosts(res.data)
        }).catch((err)=>console.log(err))
    },[])
  return (
    <div>GetPosts</div>
  )
}

export default GetPosts