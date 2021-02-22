import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authservice: AuthService, private router:Router) { }
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  }

  createUser(form: NgForm) {
    const user = form.value;
    this.authservice.createUser(user).subscribe((res) => {
      this.resetForm(form);
      this.router.navigate(['']);
    },
    error => alert(error.error));
  };
  


}
