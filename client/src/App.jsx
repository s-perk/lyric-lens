import { useState } from "react";
import axios from 'axios'

import Header from "./Header.jsx"
import Viewer from "./Viewer.jsx"

function App() {

  const [formData, setFormData] = useState({ song: '', artist: '' });

  const handleSubmit = (event) => {
    event.preventDefault();

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
      <Viewer />
    </div>
  )
}

export default App
