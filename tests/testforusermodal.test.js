const User = require('../models/User');
const mongoose = require('mongoose');

// const db=require('../database/test_db')
const url = 'mongodb://localhost:27017/new_blogdb2021diff';
beforeAll(async () => {
await mongoose.connect(url, {
useNewUrlParser: true,
useCreateIndex: true
});
});
afterAll(async () => {
    await mongoose.connection.close();
    });

    describe('User Schema test anything', () => {
        // the code below is for insert testing
        it('Add user testing anything', () => {
        const user = {
        
        'email': 'emailuew21@email.com',
        'username':'testete',
        'userType':'normaluser',
        'phone':'9432014121',
        'password':'ewrjoqerw',
        'gender':'Male',
        'image':'noimg.jpeg'
        };
        return User.create(user)
        .then((pro_ret) => {
        expect(pro_ret.username).toEqual('testete');
        })

    })
    it('to test the update profile info', async () => {
    return User.findOneAndUpdate({_id :Object('607e7bfc78ff1a19585e286e')},
    {$set : {username:'brad PIIT'}})
    .then((pp)=>{
    expect(pp.username).toEqual('brad PIIT')
    })
    }); 
    // get user info
    it('to test the get profile info', async () => {
        return User.findById("607e7bfc78ff1a19585e286e")
        .then((pp)=>{
        expect(pp.username).toEqual('brad PIIT')
        })
        });
        
// the code below is for delete testing
it('to test the delete product is working or not', async () => {
    const status = await User.deleteOne({id:"607e7bfc78ff1a19585e286e"})
    expect(status.ok).toBe(1);
    })


})


    
