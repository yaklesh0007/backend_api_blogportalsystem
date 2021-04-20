
const mongoose = require('mongoose');
const Post = require('../models/Post');

const url = 'mongodb://localhost:27017/new_blogdb2021diff';
beforeAll(async () => {
await mongoose.connect(url, {
useNewUrlParser: true,
useCreateIndex: true
});
});
// const db=require('../database/test_db')
afterAll(async () => {
    await mongoose.connection.close();
    });

    describe('blog Schema test anything', () => {
        // the code below is for insert testing
        it('Add blog testing anything', () => {
        const blog = {
        'title': 'Nokia',
        'description': 'dsnkdakndkdas',
        'category':'Social',
        'userID':'60507e787f2b983230735194'
        };
        return Post.create(blog)
        .then((pro_ret) => {
        expect(pro_ret.title).toEqual('Nokia');
        })

    })
    // // for updating the blog
it('to test the update', async () => {
    return Post.findOneAndUpdate({_id :'607e7bfc90f9510f14bc13aa'},
    {$set : {title:'apple'}})
    .then((pp)=>{
    expect(pp.title).toEqual('apple')
    })
    });

// get user info
it('to test the get product by id', async () => {
    return Post.findById("607e7bfc90f9510f14bc13aa")
    .then((pp)=>{
    expect(pp.title).toEqual('Nokia')
    })
    });
    // // the code below is for delete testing
it('to test the delete product is working or not', async () => {
    const status = await Post.deleteOne({id:"607e7bfc90f9510f14bc13aa"})
    expect(status.ok).toBe(1);
    })

})



       
       