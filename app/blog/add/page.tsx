"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const url = "https://next-blog-prisma.vercel.app";

const AddBlog = () => {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const router = useRouter();
    const postBlog = async ({
        title,
         description
        }:{
        title: string; 
        description: String;
    })=>{
        const res = fetch(`${url}/api/blog`,{
            method: "POST",
            body: JSON.stringify({title, description}),
            //@ts-ignore
            "Content-Type": "application/json",
        });
        return (await res).json();
    }


    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if(titleRef.current && descriptionRef.current){
            toast.loading("Sending Request... 🤪", {id:"1"})
            await postBlog({title: titleRef.current?.value, description: descriptionRef.current?.value});
            toast.success("Blog Posted Successfully! 🔥", {id:"1"})
            router.push("/");
        }
    }
    return(
   <Fragment>
    <Toaster />
    <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
            <p className="text-2xl text-slate-200 font-bold p-3">
                Add a wonderfull Blog 🍻
            </p>
            <form onSubmit={handleSubmit}>
                <input ref={titleRef} placeholder="Enter title" type="text" className="rounded-md px-4 w-full p-2 my-2" />
                <textarea ref={descriptionRef} placeholder="Enter Description" className="rounded-md px-4 w-full my-2"></textarea>
                <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">Submit</button>
                <Link href={"/"}  className="font-semibold px-4 py-2 shadow-xl bg-slate-300 rounded-lg m-auto hover:bg-slate-200">Back to List</Link>
            </form>
        </div>
    </div>
   </Fragment>
  )
}

export default AddBlog