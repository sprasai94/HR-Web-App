const mongoose = require('mongoose');
const Joi = require('joi');

const Employee = mongoose.model('Employee', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  salary: { 
    type: Number,
    required: true
  },
  deduction: {
        type: Number,
        required: true
      },
  paycheck: {
    type: Number,
    required:false
  },
  userId: {
    type: String
  }

}));

function validateEmployee(employee) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      salary: Joi.number().required(),
      deduction: Joi.number().min(1).max(99).required(),
      paycheck: Joi.number().optional(),
      userId: Joi.string().optional()
    });
    return schema.validate(employee);
  }

  exports.Employee = Employee; 
  exports.validate = validateEmployee;