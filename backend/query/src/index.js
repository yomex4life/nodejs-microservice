const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res)=>{
    res.send(posts)
})

app.post('/events', (req, res) =>{
    const {type, data} = req.body
    console.log('We are here')
    if(type === 'PostCreated')
    {
        const {id, title} = data
        posts[id] = { id, title, comments: []}
    }

    if(type === 'CommentCreated')
    {
        const {id, content, postId} = data
        const post = posts[postId]
        post.comments.push({id, content})
    }
    res.send({})
})


app.listen(5001, ()=>{
    console.log('listening on 5001')
})