import axios from "axios"
import { useEffect } from "react"
import { FormResType } from "../../CommonTypes"
import toast from "react-hot-toast"
import { getPosts } from "../../utils/api"

type GetPostsProps={
  posts:FormResType[],
  setPosts:React.Dispatch<React.SetStateAction<FormResType[]>>
  setId:React.Dispatch<React.SetStateAction<string>>
}

function GetPosts(props:GetPostsProps) {
    const {posts,setPosts,setId}=props
    useEffect(()=>{
        getPosts({setPosts})
    },[]);

const deleteHandler=(id:string)=>{
  axios.delete(`http://localhost:4000/posts/${id}`).then((res)=>{
    toast.success("post removed successfully");
    getPosts({setPosts})
  }).catch(err=>toast.error(err.message))
}

  return (
    <div>
      <h1>posts</h1>
      <ul>
        {posts.map((item)=>{
          return <li onClick={()=>setId(item.id)} key={item.id}>
            <p>{item.title}</p>
            <p onClick={()=>deleteHandler(item.id)}>delete</p>
          </li>
        })}
      </ul>
    </div>
  )
}
export default GetPosts