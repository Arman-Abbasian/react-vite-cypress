import axios from "axios"
import toast from "react-hot-toast"
import { FormResType } from "../CommonTypes"
import React from "react"


export const getPosts=({ setPosts }: { setPosts: React.Dispatch<React.SetStateAction<FormResType[]>> })=>{
    axios.get("http://localhost:4000/posts").then(res=>{
        setPosts(res.data as FormResType[])
        }).catch((err)=>toast.error(err.message))
}