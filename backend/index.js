require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.SERVER_PORT || 9000;
const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

app.post("/getAccessToken", async (req, res) => {
  const { code } = req.body;
  try {
    const { data: data2 } = await axios.post("https://github.com/login/oauth/access_token", {
      client_id,
      client_secret,
      code,
      redirect_uri,
    });
    console.log('saad1', String(data2));
    const access_token = new URLSearchParams(String(data2)).get('access_token');
    console.log("the token", access_token);
    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    })
    console.log('saad2', JSON.stringify(data))
    return res.status(200).json({ ...data, accessToken: access_token })
  } catch (e) {
    console.log("error:", e)
    return res.status(400).json(e)
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

