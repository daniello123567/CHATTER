"use client"
import Tiptap from "./Tiptap"
function NotePicker() {

  return (
    <form className='notepicker'>
      <div className='notepickerhead'>Markdown component</div>
       <Tiptap/>
    </form>
  )
}

export default NotePicker
