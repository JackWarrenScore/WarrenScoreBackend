const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'WarrenScoreDB',
    user:     'postgres',
    password: 'a'
  }
});


module.exports = function(app){
    app.post('/upsert-campaign-mailing-list', (req, res) => {
        const campaignId = req.body.campaignId;
        const campaignRecipients = req.body.campaignRecipients;
      
        for(const index in campaignRecipients) {
          knex.insert({
            campaign_id: campaignId,
            email: campaignRecipients[index]
          })
          .into('campaign_mailing_list')
          .onConflict(['email', 'campaign_id'])
          .merge()
          .then(function () {})
        }
      
        res.send({'Success':'Great job!'});
      })

      app.post('/get-mailing-list', (req, res) => {
        const campaignId = req.body.campaignId;
        knex.select('email')
          .where({campaign_id: campaignId})
          .from('campaign_mailing_list')
          .then(data => {
            res.send(data)
          });
      })
}