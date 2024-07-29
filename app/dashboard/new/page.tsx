"use client"
import {  Poppins } from "next/font/google"
import { useState ,useEffect} from "react";
import TipTap from "@/app/components/Tiptap"
import { Plus } from "lucide-react";
import supabase from "@/app/utils/supabase";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter,useSearchParams } from "next/navigation";
import { GetArticleById } from "@/app/actions/supabaseactions";
const pop = Poppins({ subsets: ["latin"], weight: '400' });
type article = {
  title:string,
    description:string,
    name?:string,
    user_id?:string,
    category:string,
    tags:Array<string>,
    content?:string,
    thumbnailUrl:string
}
const categories = ["inspiration", "Coding", "Cooking", "Entertainment", "Sports", "Politics", "Artificial Inteligence", "Movies", "Lifestyle"];
function Page() {
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('edit');
  const {user} = useUser()
  const router = useRouter();
  const [editContent,setEditcontent] = useState<object|undefined|''>('')
  const [imageisLoaading,setimageisLoading] = useState(false);
  const [SavedContent,setsavedContent] = useState('')
  const [tipTapContent,setTiptapcontent] = useState('')
  const [article,setArticle] = useState<article>({
    title:'',
    description:'',
    category:'',
    tags:[],
    thumbnailUrl:''
  });
  useEffect(()=>{
    const saveItems = () =>{
    if(tipTapContent){
       localStorage.setItem('article',tipTapContent);
    }
  }
  if(article.category&&article.tags&&article.title&&article.description){
    localStorage.setItem('object',JSON.stringify(article))
  }
    saveItems();
  },[tipTapContent,article]);
  useEffect(()=>{
      const mainContent = localStorage.getItem('article');
      const arts = String(localStorage.getItem('object'));
      if(mainContent){
        console.log(mainContent,"saved!");
        setsavedContent(mainContent)
      }
      if(arts){
        const artsBr = JSON.parse(arts);
        setArticle({...article,...artsBr})
      }
      const awaiting = async ()=>{
        if(!isEdit)return;
        const data = await GetArticleById(isEdit);
        const {Title,Description,Category,Thumbnail,Tags,Content} = data[0];
            setArticle({...article,title:Title,description:Description,tags:[...Tags],thumbnailUrl:Thumbnail,category:Category});
            setsavedContent(Content)

      }
      if(isEdit){
        awaiting()
      }
  },[isEdit])
  console.log(article,"jumia");
  console.log(editContent,"jumia");

const [tag,setTag] = useState('')
  const handleArts = (e:any)=>{
    setArticle({...article,[e.target.name]:e.target.value})
  }
const handleCategory = (e:any) =>{
    setArticle({...article,category:e.target.innerText})
}
const addTag = () =>{
  const tagCollecter:any = document.getElementsByClassName('tagMan');
  tagCollecter[0].focus()

  if(article.tags.length !== 7){
  setArticle({...article,tags:[...article.tags,tag]});
  setTag('')
  }
}
const deleteTag = (e:any)=>{
  const newSetOfTags = article.tags.filter((tag)=>e.target.innerText !== tag);
  setArticle({...article,tags:[...newSetOfTags]})
}
const handleImage = ()=>{
  const fileInput:any = document.querySelector('.file-input');
  fileInput?.click()
}
const handleImageTwo = async(e:any)=>{
 const file = e.target.files[0];
 const fileName = `${Date.now()}-${file.name}`;
 setimageisLoading(true)
  const {data,error} = await supabase.storage.from('images').upload(
    fileName,
    file
  );
  if(data){
 const url = supabase.storage.from('images').getPublicUrl(data?.path);
 setArticle({...article,thumbnailUrl:url.data.publicUrl})

  }
  setimageisLoading(false)
}
const publish = async ()=>{
  if(article.category&&article.description&&tipTapContent&&article.tags.length!==0&&article.thumbnailUrl){
  const {data,error} = await supabase.from('articles').insert({
    name:user?.username,
    user_id:user?.id,
    Title:article.title,
    Description:article.description,
    Content:tipTapContent,
    Category:article.category,
    Tags:[...article.tags],
    Thumbnail:article.thumbnailUrl
  }).select();
  if(data)
    router.push(`/article/${data[0].id}`)}
  else{
    alert('complete all fields')
  }

}
const clear = () =>{
  const sure = prompt('are you sure you really wan to clear??(y/n)');
if(sure=='y'){
  setArticle({title:'',
    description:'',
    category:'',
    tags:[],
    thumbnailUrl:''});
    localStorage.removeItem('object');
    localStorage.removeItem('article');
    setTiptapcontent('')
    setsavedContent('')
}

}
const handleUpdate = async ()=>{
  const {data,error} = await supabase.from('articles').update({
    Title:article.title,
    Description:article.description,
    Content:tipTapContent,
    Category:article.category,
    Tags:[...article.tags],
    Thumbnail:article.thumbnailUrl
  }).eq('id',isEdit).select();
  if(data)
    router.push(`/article/${data[0].id}`)



}
  return (
    <div className={`${pop.className}`}>
      <form className="bg-white rounded leading-6 pb-[3em]  mx-auto pt-[2em] px-[1.5em]  w-[80%] h-[max-content]">
      {article.title||article.category||article.description||article.tags.length!==0||tipTapContent?<button className="block bg-blue-600 text-white font-bold px-[1em] py-[.5em] rounded" type="button" onClick={clear}>Clear?</button>:''}

        <label className="font-bold" htmlFor="title">Title:</label>
        <input value={article.title} onChange={handleArts} name="title" className=" outline-none bg-slate-50 rounded-md block placeholder:text-sm w-full px-[1.3em] mt-[1em] py-[1em]" placeholder="Title" type="text" />
        <label className="font-bold" htmlFor="title">Description:</label>
        <input value={article.description} onChange={handleArts} name="description" className=" outline-none bg-slate-50 rounded-md block placeholder:text-sm w-full px-[1.3em] mt-[1em] py-[1em]" placeholder="Description" type="text" />
        {article.category && <div className="bg-slate-100 p-[1em] w-[max-content] mt-[1em] rounded-full">You choosed :  {article.category}</div>}
        <div className="flex flex-wrap gap-[1em] mt-[1em]">
          <h1 className="font-bold">Choose Category:
             </h1>
          {categories.map((category: string) => {
            return <button key={category} onClick={handleCategory} className="bg-green-600 outline px-[1em] py-[.6em] rounded-full text-sm outline-2 text-white font-bold outline-green-500" type="button">{category}</button>
          })}
        </div>
        <h1 className="mt-[1em] font-bold">Thumbnail for Your Article😊</h1>
        <div className="mt-[1em] mb-[2em] border-[.4em] w-full h-[20em] border-dashed">
          {<div onClick={handleImage} className="flex w-full cursor-pointer h-full items-center justify-center">
           {imageisLoaading? <Image className="w-[3em] h-[3em]" src='/Rocket.gif' width={1} height={1} alt="loading icon" />:article.thumbnailUrl?<img src={article.thumbnailUrl} className="w-full h-full object-contain" alt={`image of ${article.thumbnailUrl}`} />:<Plus />}
           <input onChange={handleImageTwo} placeholder="enter file" className="file-input hidden" type="file"  />

          </div>}
        </div>

        <label className="font-bold " htmlFor="tags">Enter tags</label>
        {article.tags.length==7 &&<p className="text-sm text-red-500">can&apos;t add more than 7 tags</p>}
        {article.tags.length !==0 &&<div className="flex flex-wrap gap-x-[1em]">chosen tags: <span className="text-[.6em] text-red-600">click on anyone to remove</span>{article.tags.map((tag:string)=>{
          return <p onClick={deleteTag} className="bg-slate-50 h-[max-content] cursor-pointer w-[max-content] px-[1em] py-[.6em]" key={tag}> {tag}</p>
        })}</div>}
        <input id="tags" value={tag} onChange={(e:any)=>setTag(e.target.value)} className="tagMan outline-none bg-slate-50 rounded-md block placeholder:text-sm w-full px-[1.3em] mt-[1em] py-[1em]" placeholder="tags e.g web development" type="text" />
        <button onClick={addTag} className="p-[.7em] mt-[1em] bg-blue-600 font-bold rounded text-white" type="button">Add Tag</button>
          <TipTap statesetter={setTiptapcontent} savedcontent={SavedContent} />
         {!isEdit?<button onClick={publish}  type="button" className="bg-blue-600 text-white font-bold px-[1em] py-[.4em]">Preview & Publish</button>:<button type="button" onClick={handleUpdate} className="bg-blue-600 text-white font-bold px-[1em] py-[.4em]">Update</button>}
      </form>

    </div>
  )
}

export default Page
