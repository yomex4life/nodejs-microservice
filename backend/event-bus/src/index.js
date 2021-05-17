const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(bodyParser.json())
//app.use(cors())

app.post('/events', (req, res)=>{
    const events = req.body

    axios.post('http://localhost:4000/events', events)
    axios.post('http://localhost:5000/events', events)
    axios.post('http://localhost:5001/events', events)

    res.send({status: 'OK'})
})

app.listen(5005, ()=>{
    console.log('Listening on 5005')
})