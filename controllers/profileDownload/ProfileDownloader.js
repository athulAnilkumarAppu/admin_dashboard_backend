const express = require('express')
const path = require('path');

const profileDownloadRouter = express.Router()


const profileDownloadApi = profileDownloadRouter.post('/', (req, res)=> {
   
    res.sendFile(path.join(__dirname+'/index.html'));
   
})

module.exports = {
    profileDownload: profileDownloadApi
}