import axios from "axios"
import { useEffect } from "react"
import { FormResType } from "../../CommonTypes"

type GetPostsProps={
  posts:FormResType[],
  setPosts:React.Dispatch<React.SetStateAction<FormResType[]>>
  setId:React.Dispatch<React.SetStateAction<string>>
}

function GetPosts(props:GetPostsProps) {
    const {posts,setPosts,setId}=props
    useEffect(()=>{
        axios.get("http://localhost:4000/posts").then(res=>{
        setPosts(res.data)
        }).catch((err)=>console.log(err))
    },[]);

  return (
    <div>
      <h1>posts</h1>
      <ul>
        {posts.map((item)=>{
          return <li onClick={()=>setId(item.id)} key={item.id}>{item.title}</li>
        })}
      </ul>
    </div>
  )
}
export default GetPosts