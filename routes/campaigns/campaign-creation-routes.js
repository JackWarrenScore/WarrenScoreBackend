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
        owner: 'Jackson Ennis'
        })
        .returning('id')
        .into('campaign')
        .then(function (id) {
        const idInt = id[0].id;
        console.log(`New campaign generated with the ID: ${idInt}`);

        res.send({'uniqueId': idInt})
        });
    })

    app.get('/get-all-campaigns', (req, res) => {
        knex.select('campaign_id', 'title', 'shape_max_size', 'radius_maximum', 'score_type').from('campaign_config').then(data => res.send(data));
    })
}