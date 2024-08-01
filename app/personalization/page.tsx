"use client"
import { Poppins } from "next/font/google"
import { useState } from "react"
import supabase from "../utils/supabase"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
const Pop = Poppins({subsets:["latin"],weight:["400"]})
const Popp = Poppins({subsets:["latin"],weight:["800"]})
const categories = ["inspiration","Coding","Cooking","Entertainment","Sports","Politics","Artificial Intelligence","Movies","Lifestyle"]

function Personalize() {
  const [choosenCategories,setChoosenCategories] = useState<string[]>([])
  const [loading,isLoading] = useState(false)
  const handleCat = (e:any)=>{

      if(!choosenCategories.includes(e.target.innerText)){
            setChoosenCategories([...choosenCategories,e.target.innerText])
      }else{
        alert(`${e.target.innerText} as already been added! click on them to remove!`)
      }
  }

const handleDelete = (e:any)=>{
      const newVal = choosenCategories.filter((category:string)=>category!==e.target.innerText);
      console.log(newVal);

      setChoosenCategories([...newVal])
}
const {user} = useUser()
const router = useRouter()
const handleSubmit = async() =>{
  if(choosenCategories.length == 0){alert('pls choose at least one');return;}
  isLoading(true)
 const {data,error} = await supabase.from('personalized').insert({
     user_id:user?.id,
     Categories:[...choosenCategories]
 });

 isLoading(false)
 router.push('/feed')
}
  return (
    <div className={`${Pop.className} px-[1.4em]`}>
      <p className={`${Popp.className} text-[3em] lg:text-[7em] font-bold`}>Personalize.</p>
      <div>
        <p>Choose Categories of articles You&apos;re insterested in</p>
        {choosenCategories.length!==0 && <div className="font-semibold mt-[1em] flex items-center gap-[2em] flex-wrap">Choosen Categories: {choosenCategories.map((category:string)=><p className="bg-slate-100 px-5 py-2 w-max rounded" onClick={handleDelete} key={category}>{category}</p>)}</div>}
        <div className="flex gap-[1em] flex-wrap mt-[1em]">
         {categories.map((category:string)=>{
          return <button key={category} onClick={handleCat} className="bg-pink-600 outline outline-pink-400 text-white font-bold px-[1.2em] py-[.7em] rounded-full" type="button">{category}</button>

         })}
        </div>
      </div>
      <button type="button" onClick={()=>{
         setChoosenCategories([...categories])
      ;
      }} className={'w-max h-max px-[1em] text-white py-[.6em] bg-blue-600 lg:mr-[1em] rounded lg:mx-auto mr-[1em] mt-[1em]'}>Select All</button>
      <button onClick={handleSubmit} type="button" className={!loading?`w-max h-max px-[1em] text-white
       py-[.6em] bg-blue-600 lg:mr-[1em] rounded lg:mx-auto mr-[1em] mt-[1em]`:'bg-blue-400 py-[.6em] px-[1em] w-max h-max text-white rounded '}>Done</button>
    </div>
  )
}

export default Personalize
