const express = require('express')

const editUserRouter = express.Router()

const userModel = require('../../models/User')

const updateUserApi = editUserRouter.post('/updateUser', (req, res)=> {
    const updatedName = req.body.updatedName
    const updatedEmail = req.body.updatedEmail
    const updatedPassword = req.body.updatedPassword

    const updatedUserId = req.body.updatedUserId

    userModel.updateOne({_id: updatedUserId}, {name: updatedName, email: updatedEmail, password: updatedPassword}).then((data)=> {
        res.status(200).json({status: true, message: 'User updated successfully'})
    }).catch((error)=> {
        res.status(200).json({status: false, message: 'Cannot update user, please try again'})
    })
})

const deleteUserApi = editUserRouter.post('/deleteUser', (req, res)=> {
    const deleteUserId = req.body.deleteUserId

    userModel.deleteOne({_id: deleteUserId}).then((result)=> {
        res.status(200).json({status: true, message: 'user deleted successfully'})
    }).catch((error)=> {
        res.status(200).json({status: false, message: 'Failed to delete user, please try again'})
    })
})

module.exports = {
    updateUser: updateUserApi,
    deleteUser: deleteUserApi 
}