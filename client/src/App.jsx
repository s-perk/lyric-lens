import { useState } from "react";
import axios from 'axios'

import Header from "./Header.jsx"
import Viewer from "./Viewer.jsx"
import ViewerTwo from "./ViewerTwo.jsx"

function App() {

  const [formData, setFormData] = useState({ song: '', artist: '' });
  const [plotData, setPlotData] = useState()
  const [viewDiv, setViewDiv] = useState('<div>Placeholder</div>')

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('form data!', formData)

    axios.post('http://localhost:3000/lyrics/', formData)
    .then((res) => {
      console.log(res.data)
      setViewDiv(res.data)
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
      <Header
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        setFormData={setFormData}
      />
      {/* <Viewer
        plotData={plotData}
        viewDiv={viewDiv}
      /> */}
      <ViewerTwo
        plotData={plotData}
        viewDiv={viewDiv}
      />
    </div>
  )
}

export default App
