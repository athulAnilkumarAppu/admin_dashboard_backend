
const express = require('express')
const mongoose = require('mongoose')

const usersListRouter = express.Router()

// we can take data from model instaed of directly using from db
const usersModel = require('../../models/User')



const userListapi = usersListRouter.post('/', (req, res)=> {
    
    usersModel.find().then((result=> {
        res.status(200).json({allUsers: result, message: 'success'})
    })).catch(()=> {
        res.status(200).json({allUsers: [], message: 'Something went wrong, try again'})
    })
  
})

module.exports = {
    userList: userListapi
}