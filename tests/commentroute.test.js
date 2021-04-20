const mongoose = require('mongoose');
const Comment = require('../models/Comment');

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

    describe('Comment Schema test ', () => {
        // the code below is for insert testing for comment
        it('Add blog testing anything', () => {
        const comment = {
        'commentBody': 'WOW',
        'postID':'607e7dd59997ca134807341c',
        'userID':'60507e787f2b983230735194'
        };
        return Comment.create(comment)
        .then((pro_ret) => {
        expect(pro_ret.commentBody).toEqual('WOW');
        })
    })

    it('to test the update', async () => {
        return Comment.findOneAndUpdate({_id :'607e7bfc90f9510f14bc13aa'},
        {$set : {commentBody:'apple'}})
        .then((pp)=>{
        expect(pp.commentBody).toEqual('apple')
        })
        });

        //  get Comment info
    it('to test the get product by id', async () => {
        return Comment.findById("607e7f7c6607fd2600d8e938")
        .then((pp)=>{
        expect(pp.commentBody).toEqual('apple')
        })
        });
    // // the code below is for delete testing
    it('to test the delete product is working or not', async () => {
        const status = await Comment.deleteOne({id:"607e7bfc90f9510f14bc13aa"})
        expect(status.ok).toBe(1);
        })
   

    
})