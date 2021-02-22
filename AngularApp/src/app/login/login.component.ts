import { EmployeeService } from './../shared/employee.service';
import { AppUser } from './../shared/user';
import { NgForm } from '@angular/forms';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  appUser: AppUser;
  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    public router:Router) {}

  async login(form: NgForm) {
    let user = form.value;
    user = await this.authService.login(user).subscribe(
      data => { 
        this.authService.authToken = data as { token:""};
        localStorage.setItem('token',this.authService.authToken.token);
        this.router.navigate(['/employee']).then(() => {
          window.location.reload();
        });
       },
      error => alert(error.error) 
    );
    }

  ngOnInit() {

  }

 

}
