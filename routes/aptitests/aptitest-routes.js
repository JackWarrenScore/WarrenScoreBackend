const AptitudeTestGenerator = require('../../aptitests-generator/AptitudeTestGenerator.js');

const knex = require('knex')({
    client: 'pg',
    connection: {
      database: 'WarrenScoreDB',
      user:     'postgres',
      password: 'a'
    }
});

module.exports = function(app){ 

    app.post('/get-demo-test', (req, res) => {
        const aptitudeTestGenerator = new AptitudeTestGenerator({
            'test_length': 5,
            'shape_max_size': 5,
            'radius_maximum': 5,
            'plus_modifier_amount': 3,
            'times_modifier_amount': 5,
            'power_modifier_amount': 1,
            'undefined_modifier_amount': 5
        });

        //TODO: The getJSON function seems to be broken. Investigate further.
        res.send(aptitudeTestGenerator.getJSON());
    })

    app.post('/upsert-aptitest-key', (req, res) => {
        const campaignId = req.body.campaignId;
        knex.select('test_length', 'shape_max_size', 'plus_modifier_amount', 'times_modifier_amount', 'power_modifier_amount', 'undefined_modifier_amount', 'radius_maximum', 'score_type')
            .where({campaign_id: campaignId})
            .from('campaign_config')
            .then(dataArray => {
                const data = dataArray[0]
                let aptitudeTestGenerator = new AptitudeTestGenerator(data);

                aptitudeTestGenerator.getShapes().forEach(shape => console.log(shape.getTiles()));

                knex.insert({
                    campaign_id: campaignId,
                    aptitest_key: aptitudeTestGenerator.getAptitestKey()
                })
                .into('campaign_code')
                .onConflict('campaign_id')
                .merge()
                .then(function () {
                  res.send({'Success':'Great job!'});
                })
            });
    });
}
