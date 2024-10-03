import React from 'react'
import DOMPurify from 'dompurify'
import "./htmlRenderer.css"
const EditorHtmlRenderer = ({title,content}) => {
const sanitizedHtml = DOMPurify.sanitize(content)
  return (
    <div className=' w-full pt-4 pb-4 flex flex-col items-center'>
        <h1 className='text-bold text-4xl mb-6 text-black'>{title}</h1>
        <div dangerouslySetInnerHTML={{__html:sanitizedHtml}} className='p-6 text-black' id='image-css'/>
        
      </div>
  )
}

export default EditorHtmlRenderer