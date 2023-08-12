import Link from "next/link";
import { GET } from "./api/blog/route";

// const url = "http://localhost:3000";

async function fetchBlogs() {
//   const res = await fetch(`${url}/api/blog`, {
//     next : {
//     revalidate : 5
//   }
// });
const res = await GET();
const data = await res.json();
return data.posts;
}

export default async function Home() {
const posts = await fetchBlogs();
console.log(posts);


  return (
<main className="w-full h-full">
  <div className="md:w2/4 sm:w3/4 m-auto p-4 my-5 rounded-lg bg-slate-800 drop-shadow-xl">
    <h1 className="text-slate-200 text-center text-2xl font-extrabold font-[verdana]">My fullstack blog with nextjs</h1>
  </div>
  {/* link */}
  <div className="flex my-5">
    <Link href={"/blog/add"} 
    className="md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-200 font-semibold">
      Add New Blog 🤡
    </Link>
  </div>
  {/* blogs */}
  <div className="w-full flex flex-col justify-center items-center">
    {posts?.map((post:any) =>(
      <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center" key={post.id}>
      {/* title and action */}
      <div className="flex items-center my-3">
        <div className="mr-auto">
        <h2 className="mr-auto font-semibold">{
          post.title
        }</h2>
        </div>
        <Link href={`/blog/edit/${post.id}`} className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200">
          Edit
        </Link>
      </div>
      {/* date and desc */}
      <div className="mr-auto my-1">
        <blockquote className="font-bold text-slate-700">{new Date(post.date).toDateString()}</blockquote>
      </div>
      <div className="mr-auto my-1">
        <h2>{post.description}</h2>
      </div>
      </div>
    ))}
  </div>
</main>
  )
}
