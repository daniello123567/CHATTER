"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import BulletList from '@tiptap/extension-bullet-list'
import Listitem from '@tiptap/extension-list-item'
import type { Editor, EditorContentProps } from '@tiptap/react'
import Underline from '@tiptap/extension-underline'
import Toolbar from './Toolbar'
const bulletList = BulletList.configure({
  itemTypeName: 'listItem'
})

const TipTap = () => {
  const [state, setState] = useState('')
  const handleChange = (newContent: any) => {
    setState(newContent);
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      id: crypto.randomUUID(),
      content: state
    }
    console.log(data);
    localStorage.setItem('data', JSON.stringify(data));
    const existingData = localStorage.getItem('data')
  }
  const editor: Editor | null = useEditor({
    extensions: [StarterKit, bulletList, Listitem, Underline],
    content: 'hello bro',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'myeditor'
      },

    },
    onCreate: ({ editor }) => {
      editor.commands.setContent('');
    },
    onUpdate: ({ editor }) => {
      const y = editor.getHTML();
      handleChange(y)


    }
  })
  console.log(state)
  return <div className='editor-parent'>
    <button type='button' onClick={handleSubmit}>PREVIEW</button>
    <Toolbar editor={editor} />
    <EditorContent editor={editor} />
  </div>
}

export default TipTap
