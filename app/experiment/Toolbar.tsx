import {
  Bold, Strikethrough, Italic, List, ListOrdered,
  Heading2, Underline, Quote, Undo, Redo, Code,
  Heading1,
  Code2
} from 'lucide-react'
import { redo, undo } from '@tiptap/pm/history'

import type { Editor } from '@tiptap/react';
function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className='toolbar'>
      <div className="btn-wrapper">
        <button
          title='saka'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run()
          }}
          className={editor.isActive("bold") ? "bg-switch-to-blue" : "normal-bg"}>
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
      </div>
    </div>
  )
}

export default Toolbar
