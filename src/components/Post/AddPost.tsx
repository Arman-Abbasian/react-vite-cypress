import axios from "axios";
import { useState } from "react"
import { FormResType } from "../../CommonTypes";
import { getPosts } from "../../utils/api";
import toast from "react-hot-toast";

type FormDataType={
    title:string,
    body:string
}

type AddPostsProps={
    setPosts:React.Dispatch<React.SetStateAction<FormResType[]>>
}


function AddPost(props:AddPostsProps) {
    const {setPosts}=props
    const [formData,setFormData]=useState<FormDataType>({title:"",body:""});

    const formDataHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
    };
    const submitHandler=(e:React.MouseEvent<HTMLFormElement, MouseEvent>)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/posts", formData)
        .then(() => {
            getPosts({setPosts})
            setFormData({ title: "", body: "" });
        })
        .catch((error) => {
            if (error.response) {
                toast.error(error.response.data);
            } else {
                toast.error("Network error:"+ error.message);
            }
        });
};

return (
    <form onSubmit={submitHandler}>
        <div>
            <label htmlFor="title">title</label>
            <input type="text" id="title" value={formData.title} name="title" onChange={formDataHandler} />
        </div>
        <div>
            <label htmlFor="body">body</label>
            <input type="text" id="body" value={formData.body} name="body" onChange={formDataHandler} />
        </div>
        <input type="submit" value="Add" />
    </form>
  )
}

export default AddPost