import { useState } from 'react'
import parse from 'html-react-parser';

function ViewerTwo({viewDiv}) {


  return (
    // <div className='grid w-full h-full' id='viewer'>
    //   <div className='self-center p-2 border-2 border-black justify-self-center'>
    //     Viewer
    //   </div>
    //   {parse("<div className='p-4 text-green-500'>hello</div>")}
    // </div>

    <iframe id="inlineFrameExample"
      title="Inline Frame Example"
      width="1750"
      height="1100"
      src="http://localhost:8050">
    </iframe>

  )
}

export default ViewerTwo
