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

  app.post('/upsert-campaign-config', (req, res) => {
    const campaignId = req.body.campaignId;
    const configData = req.body.configData;
    knex.insert({
      campaign_id: campaignId,
      title: configData.title,
      description: configData.description,
      test_length: configData.test_length,
      shape_max_size: configData.shape_max_size,
      plus_modifier_amount: configData.plus_modifier_amount,
      times_modifier_amount: configData.times_modifier_amount,
      power_modifier_amount: configData.power_modifier_amount,
      undefined_modifier_amount: configData.undefined_modifier_amount,
      radius_maximum: configData.radius_maximum,
      score_type: configData.score_type
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
    knex.select('campaign_id', 'title', 'description', 'test_length', 'shape_max_size', 'plus_modifier_amount', 'times_modifier_amount', 'power_modifier_amount', 'undefined_modifier_amount', 'radius_maximum', 'score_type')
      .where({campaign_id: campaignId})
      .from('campaign_config')
      .then(data => res.send(data[0]));
  })
}
