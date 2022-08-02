const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'WarrenScoreDB',
    user:     'postgres',
    password: 'a'
  }
});


//TODO: Add data validation
function isConfigValid(config){
    if(false){
        return false;
    }
    return true;
}

//THIS ISN'T WORKING BECAUSE I NEED TO ADD THE test_length attribute to the
//DATABASE
//FRONTEND CONFIG PAGE
//BACKEND INSERTION
//UPSERT CAMPAIGN CONFIG ROUTE

module.exports = function(app){ 

  app.post('/upsert-campaign-config', (req, res) => {
    const campaignId = req.body.campaignId;
    const configData = req.body.configData;
    knex.insert({
      campaign_id: campaignId,
      title: configData.TITLE,
      description: configData.DESCRIPTION,
      shape_max_size: configData.SHAPE_MAX,
      plus_modifier_amount: configData["*"],
      times_modifier_amount: configData["*"],
      power_modifier_amount: configData["^"],
      undefined_modifier_amount: configData["u"],
      radius_maximum: configData.RADIUS_MAX,
      score_type: configData.SCORE_TYPE
    })
    .into('campaign_config')
    .onConflict('campaign_id')
    .merge()
    .then(function () {
      res.send({'Success':'Great job!'});
    })
  })

  app.post('/get-config', (req, res) => {
    const campaignId = req.body.campaignId;
    knex.select('campaign_id', 'title', 'description', 'shape_max_size', 'plus_modifier_amount', 'times_modifier_amount', 'power_modifier_amount', 'undefined_modifier_amount', 'radius_maximum', 'score_type')
      .where({campaign_id: campaignId})
      .from('campaign_config')
      .then(data => res.send(data[0]));
  })
}
