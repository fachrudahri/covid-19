const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/', (req, res) => {
    const promise1 = fetch('https://api.kawalcorona.com/positif/').then((response) => response.json())
    const promise2 = fetch('https://api.kawalcorona.com/sembuh/').then((response) => response.json())
    const promise3 = fetch('https://api.kawalcorona.com/meninggal/').then((response) => response.json())
    const promise4 = fetch('https://api.kawalcorona.com/indonesia/').then((response) => response.json())
    const promise5 = fetch('https://api.kawalcorona.com/indonesia/provinsi/').then((response) => response.json())

    Promise.all([promise1 ,promise2 ,promise3, promise4, promise5]).then(response => {
        //memanfaatkan destructuring Array untuk menamakan tiap-tiap array pada Promise.all
        const [positif, sembuh, meninggal, indonesia, provinsi] = response
        res.render('index', {
            positif: positif.value,
            sembuh: sembuh.value,
            meninggal: meninggal.value,
            indo: indonesia,
            datas: provinsi
        })
    })
})

router.get('/alldata', (req, res) => {
    fetch('https://api.kawalcorona.com/indonesia/provinsi/')
    .then((response) => {
        return response.json()
    })
    .then((alldata) => {
        res.render('alldata', { alldata })
    }).catch(err => console.log(err))
})

module.exports = router