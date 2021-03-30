const express=require('express');//third party
const bodyParser=require('body-parser')// coremodule
const cors=require('cors');
const path=require('path')
const publicDir = path.join(__dirname,'public')
const app=express();
app.use(express.static(publicDir))
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

const db=require('./database/blog_db')

app.use(cors(
    // {credentials: true, origin: 'http://localhost:3000'}
    ))
const user_route=require('./routes/userRoute')

const blog_route=require('./routes/postRoute')
const like_route=require('./routes/likeRoute')
const comment_route=require('./routes/commentRoute')
const reply_route=require('./routes/replyRoute')
app.use(like_route)

app.use(comment_route)
app.use(reply_route)

app.use(user_route)
app.use(blog_route)

app.listen(90);