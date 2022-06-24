const knex = require('knex')({
    client: 'pg',
    connection: {
      database: 'WarrenScoreDB',
      user:     'postgres',
      password: 'a'
    }
});

let cors = require("cors");

const express = require('express')
const app = express()

app.use(cors());


app.post('/campaigns/create', (request, response) => {
    response.json({'status':'Great success!'});
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})