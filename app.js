const express=require('express');//third party
const bodyParser=require('body-parser')// coremodule


const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

const db=require('./database/blog_db')
const user_route=require('./routes/userRoute')
const category_route=require('./routes/categoryRoute')
const blog_route=require('./routes/postRoute')
const comment_route=require('./routes/commentRoute')
const reply_route=require('./routes/replyRoute')
app.use(comment_route)
app.use(reply_route)
app.use(user_route)
app.use(category_route)
app.use(blog_route)
app.listen(90);