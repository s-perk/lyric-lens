import config from "dotenv"
import express from "express"
import path from  "path"

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {router} from './routes.js'
import cors from "cors"
import bodyParser from "body-parser"

const app = express();
let port = process.env.PORT || 3000;

import morgan from 'morgan'

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