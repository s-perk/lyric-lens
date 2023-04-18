import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import searchLogo from '/search-circle.svg'
import axios from 'axios'
import './App.css'

function App() {

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const formData = new FormData(event.target); // Create a new FormData object from the form data
    console.log('submit!')
    axios.get('http://localhost:3000/lyrics/', formData)
    .then((res) => {
      console.log(res)
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <div className="App">
      <h1>lyric lens</h1>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={searchLogo} className="logo" alt="Vite logo" />
        </a>
        <form id='song-search' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='song-artist'>Artist: </label>
            <input type='text' name='song-artist' id='song-artist'></input>
          </div>
          <div>
            <label htmlFor='song-name'>Song: </label>
            <input type='text' name='song-name' id='song-name'></input>
          </div>
          <div className="card">
            <input type='submit'></input>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
