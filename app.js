
const express = require('express')
const app = express()
const cors = require('cors');
const db = require('./db/queries')
const webHome = process.env.WEB_HOME
const router = new express.Router();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(cors({
    origin: webHome
}));
app.use(express.json());

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)

module.exports = app;
