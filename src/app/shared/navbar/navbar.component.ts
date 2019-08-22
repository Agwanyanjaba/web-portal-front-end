import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authent.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logoutResponse; userLoggedInAs: any;

  constructor(private router: Router,
              private aunthetication: AuthenticationService,
              private toast: ToastrService
  ) { }

  ngOnInit() {
    this.userLoggedInAs = localStorage.getItem('userLoggedInAs');

  }

  // logout() {
  //
  //   this.aunthetication.logout()
  //     .subscribe(logout => {
  //       this.logoutResponse = logout;
  //       localStorage.clear();
  //       console.log('What response was received at this point', logout);
  //       this.toast.success('Logout Successful');
  //       this.router.navigate(['/login']);
  //       });
  //    }

  logout () {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userLoggedInAs');
    localStorage.removeItem('userrole');
    localStorage.removeItem('username');
    // this.spinnerService.hide();
    this.toast.success('Logout Successful');
    this.router.navigate(['/login']);

  }
}
