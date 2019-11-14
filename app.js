// module.exports = {
//     getUsers,
// }
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



const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: 5432,
})
// app.get('/users', db.getUsers)
app.get('/users', (request, response) => {

    pool.query('SELECT * FROM user_account ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
});

module.exports = app;
