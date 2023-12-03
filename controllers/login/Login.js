const express = require('express')
let mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


// const db = mongoose.connection;

// we can take data from model instaed of directly using from db
const userModel = require('../../models/User')

const loginRouter = express.Router();

var bodyParser = require('body-parser')

loginRouter.use(bodyParser.urlencoded({ extended: false }))
loginRouter.use(bodyParser.json())

const accessTokenSecret = 'token'
const refreshTokenSecret = 'refreshToken'





const loginApi = loginRouter.post('/', async (req, res)=> {
  
    const reqUsername = req.body.username
    const reqPassword = req.body.password

    const accessToken = jwt.sign({ username: reqUsername}, accessTokenSecret, { expiresIn: '20m' });
      const refreshToken = jwt.sign({ username: reqUsername}, refreshTokenSecret, {expiresIn: '1d'});

    // const usersCollection = db.collection('users')

    const dbuser = await userModel.findOne({email: reqUsername})
    
    if(dbuser){
        if(dbuser.email === reqUsername && dbuser.password === reqPassword){
            res.send({loginStatus: true, token: accessToken, refreshToken: refreshToken, message: 'success'})
        }else{
            res.send({loginStatus: false, message: 'Invalid Username or password'})
        }
    }else{
        res.send({loginStatus: false, message: 'Invalid Username or password'})
    }
   
})




module.exports = {
    login: loginApi,
    accessTokenSecret: accessTokenSecret,
    refreshTokenSecret: refreshTokenSecret
}

   



