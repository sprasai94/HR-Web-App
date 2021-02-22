import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from './../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee;
  numOfemployee: number = 0;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form) 
      form.reset();
    this.employeeService.selectedEmployee = this.selectedEmployee = {
      _id:"",
      name: "",
      salary: null,
      deduction: null,
      paycheck: null
    }
  }

  onSubmit(form: NgForm) {
    const { _id, ...employee } = form.value;
    if (!_id ) {
      this.employeeService.postEmployee(employee).subscribe(res => {
        this.resetForm(form);
       this.refreshEmployeeList();
        //M.toast({ html: 'Saved successfully', classes: 'rounded' });
      },
      error => alert(error.error));
    }
    else {
      this.employeeService.putEmployee(_id, employee).subscribe(res => {
        this.resetForm(form);
        this.refreshEmployeeList();
        //M.toast({ html: 'Updated successfully', classes: 'rounded' });
      },
      error => alert(error.error));
      
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
      this.employees = this.employeeService.employees;
      this.numOfemployee = this.employees.length;
    });
    
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = this.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        //M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
