import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authent.service';
import {Login} from '../model/login';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = new Login();
  loginResponse: any;
  loadingbtn: boolean;

  constructor(private router: Router,
              private autheticate: AuthenticationService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toast: ToastrService
              ) {
    this.loadingbtn = false;
  }

  ngOnInit() {
  }

  login (credentials) {
    this.loadingbtn = true;
    console.log('What are the credentials', credentials.userName);
    if (credentials.username === undefined || credentials.password === undefined ) {
      console.log('Stepped in A');
      this.toast.error('fields cannot be empty');
      this.loadingbtn = false;
    } else {
      console.log('Stepped in A');
   //   this.toast.success('Login Successful');
   //   this.router.navigate(['/dashboard']);
      // this.spinnerService.show();
      this.autheticate.login(this.credentials)
        .subscribe(login => {
          this.loginResponse = login;
          console.log('Login Response', this.loginResponse);
       if (this.loginResponse.status !== null) {
         if (this.loginResponse.status.type === 'true' || this.loginResponse.status.code === '0') {

           if (this.loginResponse.user.role === 'ADMIN') {
             localStorage.setItem('currentUser', JSON.stringify(login));
             localStorage.setItem('userLoggedInAs', this.loginResponse.user.name);
             localStorage.setItem('userrole', this.loginResponse.user.role);
             localStorage.setItem('username', this.loginResponse.user.username);
             // this.spinnerService.hide();
             this.toast.success('Login Successful');
             this.router.navigate(['/view/users']);

           } else if (this.loginResponse.user.role === 'CHECKER') {
             localStorage.setItem('currentUser', JSON.stringify(login));
             localStorage.setItem('userLoggedInAs', this.loginResponse.user.name);
             localStorage.setItem('userrole', this.loginResponse.user.role);
             localStorage.setItem('username', this.loginResponse.user.username);
             // this.spinnerService.hide();
             this.toast.success('Login Successful');
             this.router.navigate(['/checker/settlement/instruction/list']);

           } else {

           localStorage.setItem('currentUser', JSON.stringify(login));
           localStorage.setItem('userLoggedInAs', this.loginResponse.user.name);
           localStorage.setItem('userrole', this.loginResponse.user.role);
           localStorage.setItem('username', this.loginResponse.user.username);
           // this.spinnerService.hide();
           this.toast.success('Login Successful');
           this.router.navigate(['/settlement/instruction/list']);
         }
         } else {
           this.toast.error('Wrong username or password');
           // this.spinnerService.hide();
           this.loadingbtn = false;
         }
       } else {
         this.toast.error('Wrong username or password');
         // this.spinnerService.hide();
         this.loadingbtn = false;
       }
          });
      }
  }
}
