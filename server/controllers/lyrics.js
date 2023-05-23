import axios from 'axios'
import spotifyFunctions from '../../utilities/spotify.js'
import spotifyController from './spotify.js'

export default  {

  get: async (req, res) => {

    console.log('track id in here? ', req.body)
    req.body.trackid = '5enxwA8aAbwZbf5qCHORXi' // Taylor Swift - All Too Well
    // req.body.trackid = '6BOh92QF6cAvNjH9SRYJxL' // Beyonce - Formation


    // Spotify Lyrics endpoint: 'https://spotify-lyric-api.herokuapp.com/'
    req.body.trackid = await spotifyController.search(req, res)

    axios.get(`${req.options.spotifyEndpoint}/?trackid=${req.body.trackid}`, req.options)
    .then ((result) => {
      // Array of array of words
      let words = spotifyFunctions.getLyricsString(result.data)
      return words
    })
    .then((words) => {
      axios.post(`${req.options.pythonEndpoint}`, words)
        .then((data) => {
          console.log('got the data!')
          res.send(data.data)
        })
    })
    .catch(err => {
      //console.log('Error: Lyrics Not Found', err)
    })
    // .then((words) => {
    //   axios.get(`${req.options.pythonEndpoint}`)
    //   .then ((div) => {
    //     res.send(div)
    //   })
    // })
    // .catch((err) => {
    //   console.log('err', err.message)
    // })
  }

}