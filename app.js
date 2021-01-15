const express=require('express');//third party
const bodyParser=require('body-parser')// coremodule


const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

const db=require('./database/blog_db')
const user_route=require('./routes/userRoute')

app.use(user_route)

app.listen(90);