const path = require('path')
const {Router} = require('express')
const router = Router()
const axios = require('axios')
const dotenv = require('dotenv')
const controller = require('./controllers/index.js')
// const controller = require('../controllers/postgres')

// Heroku API info
const HEROKU_API_END_POINT = 'https://spotify-lyric-api.herokuapp.com/'
const HEROKU_HEADERS = {
  "Authorization" : `${process.env.API_KEY}`
}



// =====================================
//         Things to do for all...
// =====================================


router.all('*', (req, res, next) => {

  // Set options with our authorization and any passed in query parameters
  let options = {
    headers: HEROKU_HEADERS,
    params: req.query,
    endpoint: HEROKU_API_END_POINT
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




module.exports.router = router
