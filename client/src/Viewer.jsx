import { useState } from 'react'
import parse from 'html-react-parser';
import ScatterPlot from './ScatterPlot.jsx'

function Viewer({plotData}) {
  return (
    <div className='w-full h-full grid' id='viewer'>
      <div className='self-center justify-self-center p-2 border-2 border-black'>
        Viewer
      </div>
      <ScatterPlot plotData={plotData}/>

    </div>
  )
}

export default Viewer
