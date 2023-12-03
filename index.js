const express = require('express');
let mongoose = require('mongoose')
const cors = require('cors');
const jwt = require('jsonwebtoken')
// var bodyParser = require('body-parser');

const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/test-db')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});


const app = express()
app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));


// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

const { login, accessTokenSecret, refreshTokenSecret } = require('./controllers/login/Login');
const { signin } = require('./controllers/signin/Signin');
const { profileDownload } = require('./controllers/profileDownload/ProfileDownloader');
const { userList } = require('./controllers/usersList/UsersList');
const { updateUser, deleteUser } = require('./controllers/editUser/EditUser');
const { employeeList, addEmployee, updateEmployee, deleteEmployee } = require('./controllers/employee/Employee');



const loginApi = login
const signinApi = signin
const profileDownloadApi = profileDownload
const userListapi = userList
const updateUserapi = updateUser
const deleteUserApi = deleteUser
const employeeListApi = employeeList
const addEmployeeApi = addEmployee
const updateEmployeeApi = updateEmployee
const deleteEmployeeApi = deleteEmployee


const accessTokenSecretValue = accessTokenSecret
const refreshTokenSecretValue = refreshTokenSecret

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];  // to remove the bearer string from front end
      jwt.verify(token, accessTokenSecretValue, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};



app.use('/login', loginApi)
app.use('/signin', signinApi)
app.use('/profileTemplate', auth, profileDownloadApi)
app.use('/allusers', auth, userListapi)
app.use('/editUser', auth, updateUserapi)
app.use('/editUser', auth, deleteUserApi)
app.use('/allEmployees', auth, employeeListApi)
app.use('allEmployees', auth, addEmployeeApi)
app.use('/allEmployees', auth, updateEmployeeApi)
app.use('/allEmployees', auth, deleteEmployeeApi)




app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });

module.exports = app;

