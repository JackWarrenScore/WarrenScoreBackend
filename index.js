// var campaignRoutes = require('./Routes/Campaigns/CampaignRoutes');

//TODO: KNEX implementation for database interface
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

//TODONE: Create Unique Id
//TODONE: Send to database
//TODO: Actually pass in the owner (however I decided to handle that biz later...)
//TODONE: Send to frontend.
app.get('/generateAvailableCampaignId', (req, res) => {
    knex.insert({
      owner: 'Jackson Ennis'
    })
    .returning('id')
    .into('campaign')
    .then(function (id) {
      const idInt = id[0].id;
      console.log(`New campaign generated with the ID: ${idInt}`);
      
      //We're creating an async function to demand that we wait until each table gets done with
      //it's inserts are completed. The function gets called immediately.
      (async () => {
        await knex.insert({campaign_id: idInt}).into('campaign_config');
        await knex.insert({campaign_id: idInt}).into('campaign_mailing_list');
        await knex.insert({campaign_id: idInt}).into('campaign_code');
      })();
            
      res.send({'uniqueId': idInt})
    });
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