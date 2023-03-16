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

app.post("/login", async (req, res) => {
  const { code } = req.body;
  try {
    const { data: accessTokenResponse } = await axios.post("https://github.com/login/oauth/access_token", {
      client_id,
      client_secret,
      code,
      redirect_uri,
    });
    const access_token = new URLSearchParams(String(accessTokenResponse)).get('access_token');
    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    })
    return res.status(200).json({ user: data, token: access_token })
  } catch (err) {
    console.log("error:", err)
    return res.status(400).json(err)
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

