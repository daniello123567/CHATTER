"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import Youtube from '@tiptap/extension-youtube'
import Image from '@tiptap/extension-image'
import BulletList from '@tiptap/extension-bullet-list'
import { useEffect } from 'react'
import Listitem from '@tiptap/extension-list-item'
import { Editor } from '@tiptap/react'
import Underline from '@tiptap/extension-underline'
import Toolbar from './Toolbar'
const bulletList = BulletList.configure({
  itemTypeName: 'listItem'
})
const TipTap = ({ statesetter,savedcontent }: {savedcontent:string|null, statesetter: any }) => {
  const [state, setState] = useState('')
  const [loding,setloading] = useState(false)
  const handleChange = (newContent: any) => {
    setState(newContent);
    statesetter(newContent)
  }




  const editor: Editor | null = useEditor({
    extensions: [StarterKit, bulletList, Listitem, Underline,Image,Youtube],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'myeditor',
      },

    },

    onUpdate: ({ editor }) => {
      const y = editor.getHTML();
      handleChange(y)
    },


  })
  useEffect(()=>{
    editor?.commands.setContent(savedcontent)
  },[savedcontent])


  return <div className='w-full relative'>
   {loding&&<div className='bg-yellow-300 absolute z-40 rounded left-[3em] top-[3em] font-bold text-[2em] px-2 py-1'>
          Your image is uploading!...
        </div>}
  <div className='editor-parent '>


    <Toolbar setLoader={setloading} editor={editor} />
    <EditorContent editor={editor} />

  </div></div>
}

export default TipTap
