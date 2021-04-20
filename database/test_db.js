const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/new_blogdb2021',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology : true
})