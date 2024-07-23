"use client"
import { Poppins } from "next/font/google"
import {  useState } from "react"
import { useRouter } from "next/navigation"
import supabase from "@/app/utils/supabase"
import { useUser } from "@clerk/nextjs"
import Header from "@/app/components/header"
const pop = Poppins({weight:"400",subsets:["latin"]});
const Categories = ()=>{
  const categories:Array<string> = ["Inspiration","Coding","Entertainment","Sports","Politics","Artificial Inteligence","Movies","Lifestyle"];
  return <>{categories.map((category:string)=>{
    return <option className={`${pop.className}`} key={category} value={category}>{category}</option>
  })}</>
}
type U = {
  Title:string|undefined,
     Description:string|undefined,
     Content:string|undefined,
     Category:string|undefined,
     ThumbnailURL:string|undefined,
     tags:Array<string|undefined>,
}
function Page() {
  const router = useRouter()
  const {user} = useUser();
  const [imageUrlgettingReady,setImageurlgettingready] = useState<boolean>(false);
  const [imageReady,setImageReady] = useState<boolean|null>(false);
  const [article,setArticle] = useState<U>({
     Title:'',
     Description:'',
     Content:'',
     Category:'',
     ThumbnailURL:'',
     tags:["saka"],
  });
  const getSupabaseFileName = async (file:any,filename:any) =>{
    const {data,error} = await supabase.storage.from('images').upload(
      filename,
      file,
      {cacheControl:'3600',upsert:false}
     )
    const originalfilename = String(data?.path);
    return originalfilename;
  }
  const getServerURL =(supabasefilename:string)=>{
   const {data} = supabase.storage.from('images').getPublicUrl(supabasefilename);
   if(data)return data.publicUrl;
  }
  const handleImage = async (e:any) =>{
     const file = e?.target.files[0];
     const filename = `${Date.now()}-${file.name}`;
     setImageurlgettingready(true)
     const imageName = await getSupabaseFileName(file,filename);
     const serverURLforImage:string|undefined = getServerURL(imageName);
     if(serverURLforImage){
      setArticle({...article,ThumbnailURL:serverURLforImage})
      setImageReady(true)
     }
    setImageurlgettingready(false)
  }

  const handleNewArticle = async (formData:FormData) =>{
    const titleData = String(formData.get('title'));
    const descriptionData = String(formData.get('description'));
    const categoryData = String(formData.get('category'))
    setArticle({...article,Title:titleData,Description:descriptionData,Category:categoryData})
  }
  console.log(article);

  const handleThumbnail:any = (e:Event) =>{
    const input:HTMLInputElement|null = document.querySelector('.file-input');
    e.preventDefault();
    if(input)input.click()

  }
  const [tag,setTag] = useState<string|undefined>();
  const handleTag = (e:any) =>{
     setTag(e?.target.value);
  }
  function addTag (tagVal:string|undefined){
    if(article.tags.length < 7){
    setArticle({...article,tags:[...article.tags,tagVal]});}
  }
  const deleteTag = (e:any) =>{
  const newTags = article.tags.filter((tag)=>{return tag!==e.target.innerText})
  setArticle({...article,tags:[...newTags]})


  }
  console.log(article);

  return (
    <>
      <Header/>
      <div className={`${pop.className} px-[2em] lg:pt-[7em] pt-[5em] bg-slate-100`}>
         <p className="text-[1.5em] mb-[.6em] md:text-[1.7rem]">welcome, <span className="font-bold">{user?.username}</span>.</p>
         <p>Let&apos;s create today.</p>
         <div className="bg-white p-[1em]  mx-auto lg:px-[2em] lg:pt-[2em] mt-[2em] h-full pb-[2em] rounded-[1em] shadow-md w-[90%]">
          <form className="flex flex-col gap-4" action={handleNewArticle}>
           <div className="flex flex-col gap-4 lg:flex-row">
            <input name="title" className="h-[3em] w-full font-[900] lg:text-[1.3em] px-3 rounded bg-gray-200" placeholder="Title of your article "  type="text" />
            <input name="description" className="h-[3em] lg:text-[1.3em] w-full px-3 rounded bg-gray-200" placeholder="Description of your article " type="text" />
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">

            <select name="category" title="dropdown" className="h-[3em] lg:text-[1.3em] w-full px-3 rounded bg-gray-200 pr-[1em]"  id="category">
             <Categories/>
            </select>
            <button type="button" onClick={handleThumbnail} className="thumb">Choose Thumbnail</button>
            <input name="thumbnail" onChange={handleImage} id="browse" className="file-input h-[3em]  lg:text-[1.3em] w-full px-3 rounded bg-gray-200" placeholder="Category of your article"  type="file" />

          </div>
         {imageUrlgettingReady ? 'loading...':imageReady&& <img className="w-[10em] object-cover h-[10em]" src={article.ThumbnailURL}/>}
          {article.tags.length==7&&<p className="text-sm text-red-600">Can&apos;t add more than seven tags sorry man...or woman</p>}
          <div className="flex gap-2">Choosen Tags:{
          article?.tags.map((tag)=>{
            return <p onClick={deleteTag} className="bg-slate-200 rounded p-2" key={crypto.randomUUID()}>{tag}</p>
          })}</div>
         <div className="w-full h-full relative">
          <input onChange={handleTag} name="Tags" className="h-[3em] w-full font-[900] lg:text-[1.3em] px-3 rounded bg-gray-200" placeholder="Tags for your article"  type="text" />
         <button onClick={()=>addTag(tag)} className="absolute top-0 lg:top-2 right-4 rounded px-[.7em] py-[.6em] text-white font-semibold bg-blue-600" type="button">Add Tag</button>
         </div>
          <input type="submit" value="submit" />
          </form>
         </div>
      </div>
    </>
  )
}

export default Page;
