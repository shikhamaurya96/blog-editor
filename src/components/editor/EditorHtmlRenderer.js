import React from 'react'
import DOMPurify from 'dompurify'
const EditorHtmlRenderer = ({title,content}) => {
const sanitizedHtml = DOMPurify.sanitize(content)
  return (
    <div className=' w-full pt-4 pb-4 flex flex-col items-center'>
        <h1 className='text-bold text-4xl mb-6'>{title}</h1>
        <div dangerouslySetInnerHTML={{__html:sanitizedHtml}} className=''/>
        
      </div>
  )
}

export default EditorHtmlRenderer