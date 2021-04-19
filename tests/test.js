
const mongoose = require('mongoose');
const Post = require('../models/Post');

const url = 'mongodb://localhost:27017/new_blogdb2021';
beforeAll(async () => {
await mongoose.connect(url, {
useNewUrlParser: true,
useCreateIndex: true
});
});
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
})

// for updating the blog
it('to test the update', async () => {
    return Post.findOneAndUpdate({_id :Object('5d20c71c0da2982d681e4bf0')},
    {$set : {title:'apple'}})
    .then((pp)=>{
    expect(pp.pname).toEqual('apple')
    })
    });
// the code below is for delete testing
it('to test the delete product is working or not', async () => {
    const status = await Post.deleteMany()
    expect(status.ok).toBe(1);
    })

       
       