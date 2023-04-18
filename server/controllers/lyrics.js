const axios = require('axios')
const spotifyFunctions = require('../../utilities/spotify.js')

module.exports = {

  get: function (req, res) {

    req.body['artist'] = req.query['song-artist']
    req.body['song'] = req.query['song-name']
    req.body.trackid = '5enxwA8aAbwZbf5qCHORXi'

    console.log(req.body)

    axios.get(`${req.options.endpoint}/?trackid=${req.body.trackid}`, req.options)
    .then ((result) => {
      let words = spotifyFunctions.getLyrics(result.data)
      res.send(words)
    }).then((payload) => {
      res.send(payload)
    }).catch((err) => {
      console.log('err', err.message)
    })
  }

}