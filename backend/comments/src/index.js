const express = require('express')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors =require('cors')
const axios = require('axios')

const app = express();
app.use(bodyParser.json())

app.use(cors())
const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) =>{
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', async(req, res) =>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content})
    commentsByPostId[req.params.id] = comments

    try {
        await axios.post('http://localhost:5005/events', {
            type: 'CommentCreated',
            data: {
                id: commentId,
                content,
                postId:req.params.id
            }
        })
        res.status(201).send(comments)
    } catch (error) {
        console.log(error)
    }
    
})

app.post('/events', (req, res) =>{
    console.log('recievent event', req.body.type)
    res.send({})
})

app.listen(5000, ()=>{
    console.log('listening on 5000')
})