// var campaignRoutes = require('./Routes/Campaigns/CampaignRoutes');

const knex = require('knex')({
    client: 'pg',
    connection: {
      database: 'WarrenScoreDB',
      user:     'postgres',
      password: 'a'
    }
});

const cors = require("cors");
const bp = require('body-parser')
const express = require('express')
const app = express()

// require('./Routes/Campaigns/CampaignRoutes')(app);

app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// app.use('/campaigns/', campaignRoutes[0]);
app.get('/', (req, res) => {
    res.send('hello world')
})

//TODO: Create Unique Id
//TODO: Send to database
//TODONE: Send to frontend.
app.get('/generateAvailableCampaignId', (req, res) => {
    const randomId = Math.floor(Math.random() * 99999999999)
    res.send({'uniqueId': randomId})
})

app.post('/upsertCampaignConfig', (req, res) => {
  console.log('Upsert endpoint got hit!')
  console.log(req.body);
  res.send({'Success':'Great job!'});
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})