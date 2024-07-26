"use client"
import { Poppins } from "next/font/google"
import { useState,useEffect } from "react"
import supabase from "@/app/utils/supabase"
import { useUser } from "@clerk/nextjs"
import TipTap from "@/app/components/Tiptap"
import Header from "@/app/components/header"
import { useSearchParams,useRouter } from "next/navigation"
import { GetArticleById } from "@/app/actions/supabaseactions"
const pop = Poppins({ weight: "400", subsets: ["latin"] });
const Categories = () => {
  const categories: Array<string> = ["Inspiration", "Coding", "Entertainment", "Sports", "Politics", "Artificial Inteligence", "Movies", "Lifestyle"];
  return <select className="h-[3em] lg:text-[1.3em] w-full px-3 rounded bg-gray-200 pr-[1em]" id="category" name="category" title="category">{categories.map((category: string) => {
    return <option className={`${pop.className}`} key={category} value={category}>{category}</option>
  })}</select>
}
type U = {
  Title: string | undefined,
  Description: string | undefined,
  Content: string | undefined|null,
  Category: string | undefined,
  ThumbnailURL: string | undefined,
  Tags: Array<string | undefined>,
}
function Page() {
  const [editbro,setEditbro] = useState<any>()
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit') ?? 'no edit';



  const { user } = useUser();
  const Router = useRouter();
  const [imageUrlgettingReady, setImageurlgettingready] = useState<boolean>(false);
  const [savedContent,setSavedContent] = useState<string|null>('')
  const [tiptapContent, setTiptapContent] = useState<string|null|undefined>('')
  const [imageReady, setImageReady] = useState<boolean | null>(false);
  const [article, setArticle] = useState<U>({
    Title: '',
    Description: '',
    Content: '',
    Category: '',
    ThumbnailURL: '',
    Tags: [],
  });
  useEffect(()=>{
  if(tiptapContent){
   localStorage.setItem('family',String(tiptapContent));
  }
  const savedContentor = localStorage.getItem('family');
  if(edit ==='no edit'){
  setSavedContent(savedContentor);
  setTiptapContent(savedContentor);
  }

  },[tiptapContent,user,edit]);
  useEffect(()=>{

    const getArticleStuffs = async()=>{
      const guy = await GetArticleById(edit);
      const theObj = guy[0];
      const {Title,Description,Content,Category,Thumbnail,Tags} = theObj;
      setEditbro({
        Title:Title,
        Description:Description,
        Content:Content,
        Category:Category,
        ThumbnailURL:Thumbnail,
        Tags:[...Tags]
      })
      setTiptapContent(Content)


    };
    if(edit !== 'no edit'){
  getArticleStuffs()
    }else return;
  },[]);
  useEffect(()=>{
    if(editbro){
      setArticle(editbro);
      setSavedContent(editbro.Content)
      setTiptapContent(editbro.Content)
    }
  },[editbro])


  const getSupabaseFileName = async (file: any, filename: any) => {
    const { data, error } = await supabase.storage.from('images').upload(
      filename,
      file,
      { cacheControl: '3600', upsert: false }
    )
    const originalfilename = String(data?.path);
    return originalfilename;
  }
  const getServerURL = (supabasefilename: string) => {
    const { data } = supabase.storage.from('images').getPublicUrl(supabasefilename);
    if (data) return data.publicUrl;
  }

  const handleImage = async (e: any) => {
    const file = e?.target.files[0];
    const filename = `${Date.now()}-${file.name}`;
    setImageurlgettingready(true)
    const imageName = await getSupabaseFileName(file, filename);
    const serverURLforImage: string | undefined = getServerURL(imageName);
    if (serverURLforImage) {
      setArticle({ ...article, ThumbnailURL: serverURLforImage })
      setImageReady(true)
    }
    setImageurlgettingready(false)
  }

  const handleNewArticle = async (formData: FormData) => {
    const titleData = formData.get('title');
    const descriptionData = formData.get('description');
    const categoryData = formData.get('category')
    if(titleData&&descriptionData&&categoryData){
      setArticle({ ...article, Title: String(titleData), Description: String(descriptionData), Category: String(categoryData), Content: tiptapContent});
      console.log(article);
    }
    if (article.Category && tiptapContent && article.Description && article.ThumbnailURL && article.Title && article.Tags) {
      if(edit === 'no edit'){
      const { data, error } = await supabase.from('articles').insert({
        user_id: user?.id,
        Title: titleData,
        Description: descriptionData,
        Content: tiptapContent,
        Category: categoryData,
        Thumbnail: article.ThumbnailURL,
        Tags: [...article.Tags],
        name: user?.username
      }).select();
      console.log(data,error);
      if(data){
      const dataId = data[0]?.id
      Router.push(`/article/${dataId}`)
      }
      ;}else{
        const {data,error} = await supabase.from('articles').update({
          Title: titleData,
          Description: descriptionData,
          Content: tiptapContent,
          Category: categoryData,
          Thumbnail: article.ThumbnailURL,
          Tags: [...article.Tags],
        }).eq('id',edit);
        Router.push(`/article/${edit}`)

      }

    } else {
      alert('complete all fields')
    }
  }

  const handleThumbnail: any = (e: Event) => {
    const input: HTMLInputElement | null = document.querySelector('.file-input');
    e.preventDefault();
    if (input) input.click()

  }
  const [tag, setTag] = useState<string | undefined>();
  const handleTag = (e: any) => {
    setTag(e?.target.value);
  }
  function addTag(tagVal: string | undefined) {
    if (article.Tags.length < 7) {
      setArticle({ ...article, Tags: [...article.Tags, tagVal] });
    }
    setTag('')
  }
  const deleteTag = (e: any) => {
    const newTags = article.Tags.filter((tag) => { return tag !== e.target.innerText })
    setArticle({ ...article, Tags: [...newTags] })
  }

  return (
    <>
      <Header />
      <div className={`${pop.className} guy px-[2em] lg:pt-[7em] pt-[5em] bg-slate-100`}>
        <p className="text-[1.5em] mb-[.6em] md:text-[1.7rem]">welcome, <span className="font-bold">{user?.username}</span>.</p>
        <p>Let&apos;s create today.</p>
        <div className="bg-white p-[1em]  mx-auto lg:px-[2em] lg:pt-[2em] mt-[2em] h-full pb-[2em] rounded-[1em] shadow-md w-[90%]">
          <form className="flex flex-col gap-4" action={handleNewArticle}>
            <div className="flex flex-col gap-4 lg:flex-row">
              <input defaultValue={article.Title} name="title" className="h-[3em] w-full font-[900] lg:text-[1.3em] px-3 rounded bg-gray-200" placeholder="Title of your article " type="text" />
              <input defaultValue={article.Description} name="description" className="h-[3em] lg:text-[1.3em] w-full px-3 rounded bg-gray-200" placeholder="Description of your article " type="text" />
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">

              <Categories />
              <button type="button" onClick={handleThumbnail} className="thumb">Choose Thumbnail</button>
              <input name="thumbnail" onChange={handleImage} id="browse" className="file-input h-[3em]  lg:text-[1.3em] w-full px-3 rounded bg-gray-200" placeholder="Category of your article" type="file" />

            </div>
            {imageUrlgettingReady ? 'loading...' : imageReady && <img alt="image of god" className="w-[10em] object-cover h-[10em]" src={article.ThumbnailURL} />}
            {article?.Tags.length == 7 && <p className="text-sm text-red-600">Can&apos;t add more than seven tags sorry man...or woman</p>}
            {article?.Tags.length >= 1 && <div className="flex gap-2">Choosen Tags:{
              article?.Tags.map((tag) => {
                return <p onClick={deleteTag} className="bg-slate-200 rounded p-2" key={crypto.randomUUID()}>{tag}</p>
              })}</div>}
            <div className="w-full h-full relative">
              <input onChange={handleTag} name="Tags" value={tag} className="h-[3em] w-full font-[900] lg:text-[1.3em] px-3 rounded bg-gray-200" placeholder="Tags for your article" type="text" />
              <button onClick={() => addTag(tag)} className="absolute top-0 lg:top-2 right-4 rounded px-[.7em] py-[.6em] text-white font-semibold bg-blue-600" type="button">Add Tag</button>
            </div>
            <TipTap savedcontent={savedContent} statesetter={setTiptapContent} />
          <input type="submit" value={edit==='no edit'?'submit':'update'} />
          </form>
        </div>
      </div>
    </>
  )
}

export default Page;
