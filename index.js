let cors = require("cors");

const express = require('express')
const app = express()

app.use(cors());

let people = [
    {
        name: "Hannah Rickard",
        number: "06-51-99-56-83",
        id: 1
    },
    {
        name: "Hyun Namkoong",
        number: "10987654",
        id: 2
    },
    {
        name: "Courtney Martinez",
        number: "3691215",
        id: 3
    }
]

app.get('/', (request, response) => {
    response.send('Nice, bro.')
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})