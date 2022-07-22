
const AptitudeTestGenerator = require("./WarrenScoreMachine/AptitudeTestGenerator");
const cors = require("cors");
const bp = require('body-parser')
const express = require('express')
const app = express()

app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

require('./Routes/Campaigns/CampaignConfigRoutes')(app);
require('./Routes/Campaigns/CampaignCreationRoutes')(app);
require('./Routes/Campaigns/CampaignMailingListRoutes')(app);


const aptitudeTestGenerator = new AptitudeTestGenerator({
    'test_length': 7,
    'shape_max_size': 4,
    'radius_maximum': 5,
    'plus_modifier_amount': 3,
    'times_modifier_amount': 5,
    'power_modifier_amount': 1,
    'undefined_modifier_amount': 5
});

aptitudeTestGenerator.getShapes().forEach(shape => shape.getTiles().forEach(tile => console.log(tile.toString())));

app.get('/', (req, res) => {
    res.send('hello world')
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})