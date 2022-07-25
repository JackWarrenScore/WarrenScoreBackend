
const AptitudeTestGenerator = require("./aptitests-generator/AptitudeTestGenerator");
const cors = require("cors");
const bp = require('body-parser')
const express = require('express')
const app = express()

app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

require('./routes/campaigns/campaign-config-routes')(app);
require('./routes/campaigns/campaign-creation-routes')(app);
require('./routes/campaigns/campaign-mailing-list-routes')(app);

require('./routes/aptitests/aptitude-demo-routes')(app);

app.get('/', (req, res) => {
    res.send('hello world')
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})