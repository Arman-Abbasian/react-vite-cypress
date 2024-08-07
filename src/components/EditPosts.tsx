import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { FormResType } from "../CommonTypes";

type EditPostProps={
  id:string,
  posts:FormResType[],
  onClick:(e: React.MouseEvent<HTMLButtonElement>) => void;
};

function EditPosts(props:EditPostProps) {
  const {id,posts,onClick}=props;
  const [formData,setFormData]=useState<FormResType>({} as FormResType);
  useEffect(()=>{
    const selectedPost = posts.find((post: FormResType) => post.id === id);
    
  },[onClick]);

  const formDataHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
    };
    const submitHandler=(e:React.MouseEvent<HTMLFormElement, MouseEvent>)=>{
        e.preventDefault();
        axios.put(`http://localhost:4000/posts/${id}`, formData)
        .then((response: AxiosResponse<FormResType>) => {
            const { data } = response; 
            console.log(data)
            setFormData({...formData, title: "", body: "" });
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log("Network error:"+ error.message);
            }
        });
    }
  return (
    <form onSubmit={submitHandler}>
        <div>
            <label htmlFor="title">title</label>
            <input type="text" id="title" value={formData.title} name="title" onChange={formDataHandler}  />
        </div>
        <div>
            <label htmlFor="body">body</label>
            <input type="text" id="body" value={formData.body} name="body" onChange={formDataHandler} />
        </div>
        <input type="submit" value="Add" />
    </form>
  )
}

export default EditPosts