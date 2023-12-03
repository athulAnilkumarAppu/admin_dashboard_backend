const express = require('express')
const mongoose = require('mongoose')

const signinRouter = express.Router()

const users = require('../../models/User')

// const db = mongoose.connection

// we can take data from model instaed of directly using from db
const usersModel = require('../../models/User')


const signinApi = signinRouter.post('/', async (req, res)=> {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    // taking data from db
    // const usersCollection = db.collection('users')

    // taking data from model
    const usersData = await usersModel.findOne({email: email})

    // checking user already exists or not
    if(usersData?.email === email){

        res.status(200).json({ signinStatus: false, message: 'User already exists, try another user', name: '' });

    }else {

        users.create({name: name, email: email, password: password}).then(newUser => {
       
            res.status(200).json({ signinStatus: true, message: 'Sign in completed successfully', name: name });
        })
        .catch(error => {
            
            res.status(200).json({ signinStatus: false, message: 'Sign in falied, Please retry' });
        });

    }
    

    

})

module.exports = {
    signin: signinApi
}