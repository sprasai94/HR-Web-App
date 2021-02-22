import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[] = [];

  // var httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //       Authorization: 'my-auth-token'
  //   })
  // };

  readonly baseURL = 'http://localhost:8848/api/employees';
  header = { headers: new HttpHeaders({
      'x-auth-token': localStorage.getItem('token')
    })
  }
  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp,this.header);
  }

  getEmployeeList() {
    return this.http.get(this.baseURL,this.header);
  }

  putEmployee(_id, emp: Employee) {
    return this.http.put(this.baseURL + `/${_id}`, emp,this.header);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`, this.header);
  }
}
