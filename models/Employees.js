
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchemaType = {
    employeeName: {type: String, require: true},
    employeeAddress: {type: String, require: true},
    employeeAge: {type: String, require: true},
    employeePhone: {type: String, require: true},
    employeeDesignation: {type: String, require: true},
    employeeCompanyName: {type: String, require: true},
    employeeImage: {type: String, requre: true}
}

let employeeSchema = new Schema(employeeSchemaType)

let employeeModel = mongoose.model('employeeModel', employeeSchema)

module.exports = employeeModel

