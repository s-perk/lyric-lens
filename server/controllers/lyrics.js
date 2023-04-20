import axios from 'axios'
import spotifyFunctions from '../../utilities/spotify.js'

export default  {

  get: function (req, res) {


    req.body['artist'] = req.query['artist']
    req.body['song'] = req.query['song']
    req.body.trackid = '5enxwA8aAbwZbf5qCHORXi'

    // Spotify Lyrics endpoint: 'https://spotify-lyric-api.herokuapp.com/'
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