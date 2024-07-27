import axios from "axios";
import { useState } from "react"

type FormDataType={
    title:string,
    body:string
}
type FormResType={
    id:number,
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
        axios.post("http://localhost:4000/posts",formData).then(({data}:FormResType)=>{
            setFormData({title:"",body:""})
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <form onClick={submitHandler}>
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