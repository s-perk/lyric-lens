import axios from 'axios'
import spotifyFunctions from '../../utilities/spotify.js'

export default  {

  get: function (req, res) {

    console.log('req.body', req.body)
    console.log('req.body', req.params)
    console.log('req.body', req.options)
    console.log('req.body', req.query)

    req.body['artist'] = req.query['artist']
    req.body['song'] = req.query['song']
    req.body.trackid = '5enxwA8aAbwZbf5qCHORXi'


    axios.get(`${req.options.endpoint}/?trackid=${req.body.trackid}`, req.options)
    .then ((result) => {
      let words = spotifyFunctions.getLyrics(result.data)
      console.log('words', words)
      res.send(words)
    }).then((payload) => {
      res.send(payload)
    }).catch((err) => {
      console.log('err', err.message)
    })
  }

}