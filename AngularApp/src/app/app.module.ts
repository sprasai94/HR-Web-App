import { AuthService } from './shared/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './shared/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuardService } from './shared/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeAddComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:'', 
        component: LoginComponent,
      },
      {
        path:'employee',
        component: EmployeeAddComponent,
        canActivate: [AuthGuardService]
      },
      {
        path:'register',
        component: RegisterComponent
      }
    ]),
    NgbModule
  ],
  providers: [EmployeeService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
