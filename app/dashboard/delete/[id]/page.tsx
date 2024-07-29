"use client"
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import supabase from '@/app/utils/supabase'
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
function Page({params}:{params:Params}) {
  const {push,refresh,replace} = useRouter();
   const handleDelete = async () =>{
        const {data,error} =  await supabase.from('articles').delete().eq('id',params.id);
         alert('deleted');
   replace(`/dashboard`)
   refresh()

   }
  return (
    <div className='w-[80%] flex flex-col justify-center items-center h-[20em] mx-auto bg-slate-100 border border-red-600 font-bold'>
      <div>pls note that your article will get deleted in the database.</div>
      <p className='text-center mb-2'>Are You Sure You want to delete article {params.id}</p>
     <button onClick={handleDelete} type="button" className='w-[8em] mx-auto mb-3 text-white h-[2em] rounded bg-red-600'>Yes</button>
     <Link href='/dashboard' type="button" className='w-[8em] mx-auto mb-3 text-center text-white h-[2em] rounded bg-green-600'>No</Link>
    </div>
  )
}

export default Page
