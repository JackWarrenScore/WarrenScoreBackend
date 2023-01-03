const knex = require('knex')({
    client: 'pg',
    connection: {
      database: 'WarrenScoreDB',
      user:     'postgres',
      password: 'a'
    }
});


module.exports = function(app){ 

    //TODONE: Create Unique Id
    //TODONE: Send to database
    //TODO: Actually pass in the owner (however I decided to handle that biz later...)
    //TODONE: Send to frontend.
    app.get('/generate-available-campaign-id', (req, res) => {
        knex.insert({
        owner: req.query.campaignOwner
        })
        .returning('id')
        .into('campaign')
        .then(function (id) {
        const idInt = id[0].id;

        console.log("We've recieved a request for a new campaign. Unique Id: ", idInt)

        res.send({'uniqueId': idInt})
        });
    })

    app.get('/get-all-campaigns', (req, res) => {
        let {campaignOwner} = req.query;
        console.log('/get-all-campaigns: ', campaignOwner)

        knex.select('config.campaign_id', 'config.title', 'config.shape_max_size', 'config.radius_maximum', 'config.score_type')
            .from('campaign_config as config')
            .leftJoin('campaign as campaign', 'campaign.id', 'config.campaign_id')
            .where('campaign.owner', '=', campaignOwner)
            .then(data => res.send(data));
    })
}