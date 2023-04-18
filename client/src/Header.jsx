import { useState } from 'react'
import searchLogo from './assets/search-circle.svg'
import axios from 'axios'



function Header({handleSubmit, handleChange, formData, setFormData}) {




  return (
    <div className="Header">

      <h1 className='text-yellow-300'>lyric lens</h1>
      <div>
        <a href="https://" target="_blank" >
          <img src={searchLogo} className="logo h-12 w-12" alt="Vite logo" />
        </a>
      </div>
      <form id='song-search' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='artist'>Artist: </label>
          <input type='text' name='artist' id='artist' value={formData.artist} onChange={handleChange}></input>
        </div>
        <div>
          <label htmlFor='song' className='text-yellow-600'>Song: </label>
          <input type='text' name='song' id='song' value={formData.song} onChange={handleChange}></input>
        </div>
        {/* <div className=""> */}
          <button
            type='submit'

            className='button text-white rounded border-transparent bg-[#1a1a1a] cursor-pointer transition-colors p-1 hover:border-[#646cff] focus:outline-4'>
              Search
          </button>
        {/* </div> */}

      </form>

    </div>
  )
}

export default Header
