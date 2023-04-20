import { useState } from 'react'
import searchLogo from './assets/search-circle.svg'
import axios from 'axios'



function Header({handleSubmit, handleChange, formData, setFormData}) {

  return (
    <div className="flex h-max navbar bg-gray-800 sticky top-0 z-50 drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)]">
      <div className='flex basis-1/2 p-1'>
        <a target="_blank" >
          <img src={searchLogo} className="logo h-12 w-12" alt="Vite logo" />
        </a>
        <h1 className='text-slate-100 self-center'>lyric lens</h1>
      </div>
      <form id='song-search' className='flex justify-self-end' onSubmit={handleSubmit}>
        <div  className='self-center pr-4 text-slate-100 items-center'>
          <label htmlFor='artist'>Artist: </label>
          <input type='text' name='artist' id='artist' value={formData.artist} onChange={handleChange} className='rounded p-[0.2rem]'></input>
        </div>
        <div  className='self-center pr-4'>
          <label htmlFor='song' className='text-slate-100'>Song: </label>
          <input type='text' name='song' id='song' value={formData.song} onChange={handleChange} className='rounded p-[0.2rem]'></input>
        </div>
        {/* <div className=""> */}
          <button
            type='submit'

            className='button text-white rounded h-[2rem] self-center border-2 border-transparent bg-[#1a1a1a] cursor-pointer transition-colors p-1 hover:border-[#646cff] hover:border-2 focus:outline-4'>
              Search
          </button>
        {/* </div> */}

      </form>

    </div>
  )
}

export default Header
