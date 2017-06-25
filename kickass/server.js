const express = require('express')
const pg = require('pg')
const bodyParser = require('body-parser')
const app = express()

app.listen(3005, () =>
  console.log("The app is listenning on port 3005 "))
