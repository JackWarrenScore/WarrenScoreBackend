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


module.exports = function(app){ 
  // app.post('/campaigns/create', (request, response) => {

  //   let config = request.body;
  //   let dataIsValid = isConfigValid(config);

  //   if(dataIsValid){
  //       //TODO: Save configuration to campaign config table
  //       //TODO: Return unique id for campaign
  //       response.json({
  //           'status':'200',
  //           'campaignId': 8675309
  //       });
  //   } else {
  //       response.json({'status':'400'})
  //   }  
  // })

  app.post('/upsertCampaignConfig', (req, res) => {
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

  app.post('/getConfig', (req, res) => {
    const campaignId = req.body.campaignId;
    knex.select('campaign_id', 'title', 'description', 'shape_max_size', 'plus_modifier_amount', 'times_modifier_amount', 'power_modifier_amount', 'undefined_modifier_amount', 'radius_maximum', 'score_type')
      .where({campaign_id: campaignId})
      .from('campaign_config')
      .then(data => res.send(data[0]));
  })
}
