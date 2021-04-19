const User = require('../models/User');
const mongoose = require('mongoose');


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
        
        'email': 'email@email.com',
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
})