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

app.get('/', (req, res) => {
    res.send('hello world')
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})