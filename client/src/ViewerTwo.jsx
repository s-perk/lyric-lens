import { useState } from 'react'
import parse from 'html-react-parser';

function ViewerTwo({viewDiv}) {


  return (
    // <div className='w-full h-full grid' id='viewer'>
    //   <div className='self-center justify-self-center p-2 border-2 border-black'>
    //     Viewer
    //   </div>
    //   {parse("<div className='text-green-500 p-4'>hello</div>")}
    // </div>

    <iframe id="inlineFrameExample"
      title="Inline Frame Example"
      width="1200"
      height="800"
      src="./python/file.html">
    </iframe>

  )
}

export default ViewerTwo
