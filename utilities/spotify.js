import axios from 'axios'
import dotenv from 'dotenv'
import qs from 'qs'

dotenv.config();

const client_id = process.env.SPOTIFY_API_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');
console.log(auth_token)

export default {

  getLyricsArray: (data) => {
    let words = []

    for (var i = 0; i < data.lines.length; i++) {
      words.push(data.lines[i].words)
    }

    return words
  },
  getLyricsString: (data) => {
    let words = ''

    for (var i = 0; i < data.lines.length; i++) {
      words = words + data.lines[i].words + '\n'
    }

    return words
  },

  getAuth: async () => {
    try{
      //make post request to SPOTIFY API for access token, sending relavent info
      const token_url = 'https://accounts.spotify.com/api/token/';
      const data = qs.stringify({'grant_type':'client_credentials'});

      const headers = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: client_id,
          password: client_secret,
        },
      };


      const response = await axios.post(token_url, data, headers)

      //return access token
      return response.data.access_token;

    }catch(error){
      //on fail, log the error in console
      console.log(error);
    }
  },

  getAudioFeatures_Track: async (track_id) => {
    //request token using getAuth() function
    const access_token = await getAuth();
    console.log(access_token);

    const api_url = `https://api.spotify.com/v1/audio-features/${track_id}`;
    //console.log(api_url);
    try{
      const response = await axios.get(api_url, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      console.log(response.data);
      return response.data;
    }catch(error){
      console.log(error);
    }
  }
};


