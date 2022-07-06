//TODO: Add data validation
function isConfigValid(config){
    if(false){
        return false;
    }
    return true;
}

module.exports = function(app){

    app.post('/campaigns/create', (request, response) => {

        let config = request.body;
        let dataIsValid = isConfigValid(config);

        if(dataIsValid){
            //TODO: Save configuration to campaign config table
            //TODO: Return unique id for campaign
            response.json({
                'status':'200',
                'campaignId': 8675309
            });
        } else {
            response.json({'status':'400'})
        }
        
    })

}