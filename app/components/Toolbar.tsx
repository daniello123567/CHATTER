"use client"
import {
  Bold, Strikethrough, Italic, List, ListOrdered,
  Heading2, Underline, Quote, Undo, Redo, Code,
  Heading1,
  Code2,
  Image
} from 'lucide-react'
import type { Editor } from '@tiptap/react';
import { useState } from 'react'
import { redo, undo } from '@tiptap/pm/history'
import supabase from '../utils/supabase';

function Toolbar({ editor,setLoader }: {setLoader:any, editor: Editor | null }) {

  const handleImage = ()=>{
    const image:HTMLInputElement|null = document.querySelector('.image-input')!;
     image.click();
  }
  const getFileUrl = async (file:any,filename:any) =>{
    const {data,error} = await supabase.storage.from('images').upload(
       filename,
       file,
       {cacheControl:'200',upsert:false}
    );
    const response = supabase.storage.from('images').getPublicUrl(String(data?.path));
    return response.data.publicUrl;
  }
  const returnFileInfo = async (e:any)=>{
     const file = e?.target.files[0];
     const filename = `${Date.now()}-${file.name}`;
     setLoader(true)
     const uploadToSupabaseUrl = await getFileUrl(file,filename);
     setLoader(false)
     editor?.chain().focus().setImage({
      src: uploadToSupabaseUrl,
      alt:`${filename}`
      }).run()

  }
  if (!editor) return null;

  return (<>
      <div className="btn-wrapper">
        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run()
          }}
          >
          <Bold />

        </button>



        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run()
          }}
          className={editor.isActive("italic") ? "bg-switch-to-blue" : "normal-bg"}

        >
          <Italic />

        </button>
        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run()
          }}
          className={editor.isActive("strike") ? "bg-switch-to-blue" : "normal-bg"}

        >
          <Strikethrough />

        </button>
        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run()
          }}
          className={editor.isActive("underline") ? "bg-switch-to-blue" : "normal-bg"}

        >
          <Underline />

        </button>
        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run()
          }}
          className={editor.isActive("bulletList") ? "bg-switch-to-blue" : "normal-bg"}

        >
          <List />

        </button>

        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.chain().toggleOrderedList().run();
          }}
          className={editor.isActive("orderedList") ? "bg-switch-to-blue" : "normal-bg"}

        >
          <ListOrdered />

        </button>

        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run()
          }}
          className={editor.isActive("blockquote") ? "bg-switch-to-blue" : "normal-bg"}

        >
          <Quote />

        </button>
        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }}
          className={editor.isActive("heading") ? "bg-switch-to-blue" : "normal-bg"}

        >
          <Heading2 />

        </button>
        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }}
          className={editor.isActive("heading") ? "bg-switch-to-blue" : "normal-bg"}

        >
          <Heading1 />

        </button>
        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.commands.undo()
          }}
          className={"normal-bg"}

        >
          <Undo />

        </button>
        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.commands.redo()
          }}
          className={"normal-bg"}

        >
          <Redo />

        </button>
        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run()
          }}
          className={editor.isActive("codeBlock") ? "bg-switch-to-blue" : "normal-bg"}

        >
          <Code2 />

        </button>
        <button
          title='image'
          type='button'
          onClick={handleImage}
          className={editor.isActive("image") ? "bg-switch-to-blue" : "normal-bg"}

        >
          <Image />

        </button>
        <input title='image' onChange={returnFileInfo} className='image-input hidden' type="file" />

      </div>
      </>
  )
}

export default Toolbar
