const mongoose=require('mongoose');
const Category=mongoose.model('Category',{
categoryType:{
    type:String,
    required:true
}
})

module.exports=Category