var campaignRoutes = require('./Routes/Campaigns/CampaignRoutes');

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

require('./Routes/Campaigns/CampaignRoutes')(app);

app.use(cors());

// app.use('/campaigns/', campaignRoutes[0]);
app.get('/', (req, res) => {
    res.send('hello world')
  })

app.get('/generateAvailableCampaignId', (req, res) => {
    res.json({
        'status':'200',
        'campaignId': 8675309
    });
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})