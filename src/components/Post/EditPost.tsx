import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { FormResType } from "../../CommonTypes";

type EditPostProps={
  id:string,
  posts:FormResType[],
  setId:React.Dispatch<React.SetStateAction<string>>
};

function EditPost(props:EditPostProps) {
  const {id,posts,setId}=props;
  const [formData,setFormData]=useState<FormResType>({} as FormResType);
  useEffect(()=>{
    const selectedPost = posts.find((post: FormResType) => post.id === id);
    setFormData(selectedPost as FormResType)
  },[id]);

  const formDataHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
    };
    const submitHandler=(e:React.MouseEvent<HTMLFormElement, MouseEvent>)=>{
        e.preventDefault();
        axios.put(`http://localhost:4000/posts/${id}`, formData)
        .then(() => {
            toast.success("data edited successfully");
            setFormData({...formData, title: "", body: "" });
            setId('')
        })
        .catch((error) => {
            if (error.response) {
              toast.error(error.message)
                console.log(error.message);
            } else {
              console.log({error})
                console.log("Network error:"+ error.message);
            }
        });
    }
    if(!id) return
  return (
    <form onSubmit={submitHandler}>
        <div>
            <label htmlFor="title">title</label>
            <input type="text" id="title" value={formData?.title} name="title" onChange={formDataHandler}  />
        </div>
        <div>
            <label htmlFor="body">body</label>
            <input type="text" id="body" value={formData?.body} name="body" onChange={formDataHandler} />
        </div>
        <input type="submit" className="submit" value="Add" />
    </form>
  )
}

export default EditPost;