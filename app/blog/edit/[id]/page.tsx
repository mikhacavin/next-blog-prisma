"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

type UpdateBlogparams = {
    title : string;
    description : string;
    id: string;
}

const url = "http://localhost:3000";

const updateBlog = async (data : UpdateBlogparams)=>{
    const res = fetch(`${url}/api/blog/${data.id}`,{
        method: "PUT",
        body: JSON.stringify({title: data.title, description: data.description}),
        //@ts-ignore
        "Content-Type": "application/json",
    });
    return (await res).json();
}

const deleteBlog = async (id: string)=>{
    const res = fetch(`${url}/api/blog/${id}`,{
        method: "DELETE",
        //@ts-ignore
        "Content-Type": "application/json",
    });
    return (await res).json();
}

const getBlogById = async (id:string) => {
    const res = await fetch(`${url}/api/blog/${id}`);
   const data = await res.json();
   return data.post;
}

const EditBlog = ({params} : {params: {id:string}}) => {
    const router = useRouter()
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() =>{
        toast.loading("Fetching Blog Detail 😒", {id: "1"}) 
        getBlogById(params.id)
        .then((data) =>{
            if(titleRef.current && descriptionRef.current){
                titleRef.current.value = data.title;
                descriptionRef.current.value = data.description;
                toast.success("Fetching Complete!🍻",{id: "1"}) 
            }
        })
        .catch((error) => {
            console.log(error);
            toast.error("Fetching Blog Error",{id: "1"});
        });
        getBlogById(params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if(titleRef.current && descriptionRef.current){
            toast.loading("Sending Request... 🤪", {id:"1"})
            await updateBlog({title: titleRef.current?.value, description: descriptionRef.current?.value, id:params.id});
            toast.success("Post Updated Successfully! 🔥", {id:"1"})
            router.push("/");
        }
    }
    const handleDelete = async  () => {
        toast.loading("Deleting Blog", {id:"2"});
        await deleteBlog(params.id);
        toast.success("Blog Deleted Successfully", {id:"2"});
        router.push("/");
    }

    return(
   <Fragment>
    <Toaster />
    <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
            <p className="text-2xl text-slate-200 font-bold p-3">
                Edit a wonderfull Blog 🍻
            </p>
            <Link href={"/"}  className="font-semibold px-4 py-2 shadow-xl bg-slate-300 rounded-lg m-auto hover:bg-slate-200">Back to List</Link>
            <form onSubmit={handleSubmit}>
                <input ref={titleRef} placeholder="Enter title" type="text" className="rounded-md px-4 w-full p-2 my-2" />
                <textarea ref={descriptionRef} placeholder="Enter Description" className="rounded-md px-4 w-full my-2"></textarea>
                <div className="flex justify-between">
                <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">Update</button>
                </div>
            </form>
                <button onClick={handleDelete} className="font-semibold px-4 py-2 shadow-xl bg-red-300 rounded-lg m-auto mt-2 hover:bg-red-500">Delete</button>
        </div>
    </div>
   </Fragment>
  )
}

export default EditBlog