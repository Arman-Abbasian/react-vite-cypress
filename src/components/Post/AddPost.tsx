import axios, { AxiosResponse } from "axios";
import { useState } from "react"

type FormDataType={
    title:string,
    body:string
}

export type FormResType={
    id:string,
    title:string,
    body:string
}

function AddPost() {
    const [formData,setFormData]=useState<FormDataType>({title:"",body:""});

    const formDataHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
    };
    const submitHandler=(e:React.MouseEvent<HTMLFormElement, MouseEvent>)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/posts", formData)
        .then((response: AxiosResponse<FormResType>) => {
            const { data } = response; 
            console.log(data)
            setFormData({ title: "", body: "" });
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