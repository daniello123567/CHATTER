"use client"
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import supabase from '@/app/utils/supabase'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { metadata } from '@/app/page';
function Page({params}:{params:Params}) {
  metadata.title=`deleting article ${params.id}`;
  metadata.description=`deleting of articles`
  const {push} = useRouter();
   const handleDelete = async () =>{
        const {data,error} =  await supabase.from('articles').delete().eq('id',params.id);
         alert('deleted');
         console.log(data,error);

          push('/dashboard?refresh=true')
   }
  return (
    <div className='w-[80%] flex flex-col justify-center items-center h-[20em] mx-auto bg-slate-100 border border-red-600 font-bold'>
      <p className='text-center mb-2'>Are You Sure You want to delete article {params.id}</p>
     <button onClick={handleDelete} type="button" className='w-[8em] mx-auto mb-3 text-white h-[2em] rounded bg-red-600'>Yes</button>
     <Link href='/dashboard' type="button" className='w-[8em] mx-auto mb-3 text-center text-white h-[2em] rounded bg-green-600'>No</Link>
    </div>
  )
}

export default Page
