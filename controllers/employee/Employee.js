const express = require('express')

const employeeRouter = express.Router()


const employeeModel = require('../../models/Employees')



const employeeListApi = employeeRouter.post('/', (req, res) => {
    if(employeeModel){
        employeeModel.find().then((result)=> {
            res.status(200).json({allEmployees: result, message: "success"})
        }).catch((error)=> {
            res.status(200).json({allEmployees: [], message: "Something went wrong, try again"})
        })
    }
})


const addEmployeeApi = employeeRouter.post('/addEmployee', (req, res)=> {
    const employeeName = req.body.employeeName
    const employeeAddress = req.body.employeeAddress
    const employeeAge = req.body.employeeAge
    const employeePhone = req.body.employeePhone
    const employeeDesignation = req.body.employeeDesignation
    const employeeCompanyName = req.body.employeeCompanyName
    const employeeImage = req.body.employeeImage

    employeeModel.create({employeeName: employeeName,
         employeeAddress: employeeAddress,
          employeeAge: employeeAge,
           employeePhone: employeePhone,
           employeeDesignation: employeeDesignation,
             employeeCompanyName: employeeCompanyName,
              employeeImage: employeeImage}).then((result)=> {
                res.status(200).json({status: true, message: 'Employee registered successfully'})
              }).catch(()=> {
                res.status(200).json({status: false, message: 'Employee registration failed'})
              })
})


const updateEmployeeApi = employeeRouter.post('/updateEmployee', (req, res)=> {
        const updatedEmployeeName = req.body.updatedEmployeeName
        const updatedEmployeeAddress = req.body.updatedEmployeeAddress
        const updatedEmployeeAge = req.body.updatedEmployeeAge
        const updatedEmployeePhone = req.body.updatedEmployeePhone
        const updatedEmployeeDesignation = req.body.updatedEmployeeDesignation
        const updatedEmployeeCompanyName = req.body.updatedEmployeeCompanyName
        const updatedEmployeeImage = req.body.updatedEmployeeImage

        const updatedEmployeeId = req.body.updatedEmployeeId 

        employeeModel.updateOne({_id: updatedEmployeeId},
             {employeeName: updatedEmployeeName,
             employeeAddress: updatedEmployeeAddress,
              employeeAge: updatedEmployeeAge,
               employeePhone: updatedEmployeePhone,
                employeeDesignation: updatedEmployeeDesignation,
                 employeeCompanyName: updatedEmployeeCompanyName,
                  employeeImage: updatedEmployeeImage}).then((result)=> {
                    res.status(200).json({status: true, message: 'employee details updated successfully'})
                  }).catch((error)=> {
                    res.status(200).json({status: false, message: 'employee updation failed, please try again'})
                  })
})


const deleteEmployeeApi = employeeRouter.post('/deleteEmployee', (req, res)=> {
    const deleteEmployeeId = req.body.deleteEmployeeId 

    employeeModel.deleteOne({_id: deleteEmployeeId}).then((result)=> {
        res.status(200).json({status: true, message: 'employee deleted successfully'})
    }).catch((error)=> {
        res.status(200).json({status: false, message: 'Employee deletion failed, please try again'})
    })
})


module.exports = {
    employeeList: employeeListApi,
    addEmployee: addEmployeeApi,
    updateEmployee: updateEmployeeApi,
    deleteEmployee: deleteEmployeeApi
}