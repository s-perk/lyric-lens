import Header from "./Header.jsx"
import { useState } from "react";
import axios from 'axios'

function App() {

  const [formData, setFormData] = useState({ song: '', artist: '' });

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    console.log('event', event)
    // const formData = new FormData(event.target); // Create a new FormData object from the form data

    console.log('form', formData)
    axios.get('http://localhost:3000/lyrics/', formData)
    .then((res) => {
      console.log(res)
    })
    .catch(error => {
      console.error(error);
    });
  }


  const handleChange = (event) =>  {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className="w-screen h-screen bg-red-300">
      <Header handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} setFormData={setFormData}/>
    </div>
  )
}

export default App
