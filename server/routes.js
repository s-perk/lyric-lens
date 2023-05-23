import path from 'path'
import {Router} from 'express'
const router = Router()
import axios from 'axios'
import dotenv from 'dotenv'
import controller from './controllers/index.js'
// import controller from '../controllers/postgres'

// END POINT INFO
const SPOTIFY_API_END_POINT = 'https://spotify-lyric-api.herokuapp.com/'
const PYTHON_SERVER_END_POINT = 'http://localhost:8000/'

const HEADERS = {
  "Authorization" : `${process.env.API_KEY}`
}



// =====================================
//         Things to do for all...
// =====================================


router.all('*', (req, res, next) => {

  // Set options with our authorization and any passed in query parameters
  let options = {
    headers: HEADERS,
    params: req.query,
    spotifyEndpoint: SPOTIFY_API_END_POINT,
    pythonEndpoint: PYTHON_SERVER_END_POINT
  }

  // Attach to our request object
  req.options = options

  // Add Access Control to Response header to avoid web request error
  // https://stackoverflow.com/questions/45975135/access-control-origin-header-error-using-axios
  res.header("Access-Control-Allow-Origin", "*");

  next()
})
// =====================================
//                GET
// =====================================

// -------------------------------------
//              LYRICS
// -------------------------------------


// ----- Track -----
router.get('/search/', controller.spotify.getTrackID)

// // ----- Lyrics -----
router.get('/lyrics/', controller.lyrics.get)


router.get('/lyrics/:trackid', controller.lyrics.get)



// -------------------------------------
//              Q&A
// -------------------------------------

// ----- Questions -----
// router.get('/qa/questions', controller.questions.getWithPhotos)



// ----- Answers -----
// router.get('/qa/questions/:question_id/answers', controller.answers.getWithPhotos)

// =====================================
//                POST
// =====================================


// -------------------------------------
//              Q&A
// -------------------------------------

// ----- Questions -----
// router.post('/qa/questions', controller.questions.post)



// ----- Answers -----
// router.post('/qa/questions/:question_id/answers', controller.answers.postWithPhotos)




export {router}
