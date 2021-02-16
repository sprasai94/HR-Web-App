const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


const { Employee, validate } = require('../models/employee');

router.get('/', async (req, res) => {
    const employees = await Employee.find().sort('name');
    res.send(employees);
});

router.get('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        
    const employee = await Employee.findById(req.params.id);

    res.send(employee);
  });

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let employee = new Employee({ 
        name: req.body.name,
        salary: req.body.salary,
        deduction: req.body.deduction
    });
    employee = await employee.save();
    
    res.send(employee);
  });

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    const employee = await Employee.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        salary: req.body.salary,
        deduction: req.body.deduction
    }, { new: true });

    if (!employee) return res.status(404).send('The employee with the given ID was not found.');

    res.send(employee);
});

router.delete('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    const employee = await Employee.findByIdAndRemove(req.params.id);
  
    if (!employee) return res.status(404).send('The employee with the given ID was not found.');
  
    res.send(employee);
  });

// router.get('/', (req, res) => {
//     Employee.find((err, docs) => {
//         if (!err) { res.send(docs); }
//         else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

// router.get('/:id', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id : ${req.params.id}`);

//     Employee.findById(req.params.id, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

// router.post('/', (req, res) => {
//     var emp = new Employee({
//         name: req.body.name,
//         salary: req.body.salary,
//         deduction: req.body.deduction
//     });
//     emp.save((err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

// router.put('/:id', async (req, res) => {
//     const emp = await Employee.findByIdAndUpdate(req.params.id,
//       { 
//         name: req.body.name,
//         salary: req.body.salary,
//         deduction: req.body.deduction
//       }, { new: true });
  
//     if (!emp) return res.status(404).send('The employee with the given ID was not found.');
    
//     res.send(customer);
//   });

// router.delete('/:id', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id : ${req.params.id}`);

//     Employee.findByIdAndRemove(req.params.id, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

module.exports = router;

