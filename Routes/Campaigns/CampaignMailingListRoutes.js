const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'WarrenScoreDB',
    user:     'postgres',
    password: 'a'
  }
});


module.exports = function(app){
    app.post('/upsertCampaignMailingList', (req, res) => {
        console.log("We've been hit.");
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
          .then(function () {
            console.log(`Just added participant index: ${campaignRecipients[index]}`)
          })
        }
      
        res.send({'Success':'Great job!'});
      })

      app.post('/getMailingList', (req, res) => {
        const campaignId = req.body.campaignId;
        knex.select('email')
          .where({campaign_id: campaignId})
          .from('campaign_mailing_list')
          .then(data => {
            console.log(data)
            res.send(data)
          });
      })
}