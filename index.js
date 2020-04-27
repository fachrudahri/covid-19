const express =require('express')
const moment = require('moment')
const expressLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 3004

const app = express()

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.locals.moment = moment

app.use('/', require('./routes/index'))

app.listen(PORT, () => {
    console.log(`server connect in PORT ${PORT}`)
})