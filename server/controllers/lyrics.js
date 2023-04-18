import axios from 'axios'
import spotifyFunctions from '../../utilities/spotify.js'

export default  {

  get: function (req, res) {


    req.body['artist'] = req.query['artist']
    req.body['song'] = req.query['song']
    req.body.trackid = '5enxwA8aAbwZbf5qCHORXi'


    axios.get(`${req.options.endpoint}/?trackid=${req.body.trackid}`, req.options)
    .then ((result) => {
      let words = spotifyFunctions.getLyrics(result.data)
      res.send(words)
    }).catch((err) => {
      console.log('err', err.message)
    })
  }

}