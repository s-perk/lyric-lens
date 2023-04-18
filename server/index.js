require("dotenv").config();
const express = require("express");
const path = require("path");
const router = require('./routes.js').router
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
let port = process.env.PORT || 3000;

const morgan = require('morgan')

// Serves up all static and generated assets in ../client/dist
app.use(express.static(path.join(__dirname, "/../client/dist")));
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

// Use body-parser middleware to parse request bodies
// Needed when Content-Type header is set to application/x-www-form-urlencoded (this is the default for <form> elements)
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router)

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  }
})

console.log(`Listening at http://localhost:${port}`);