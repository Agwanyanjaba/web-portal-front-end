import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authent.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userLoggedInAs;
  userRole;
  logoutResponse: any;
  loadAPI: Promise<any>;

  constructor(private router: Router,
              private aunthetication: AuthenticationService,
              private toast: ToastrService) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit() {
    this.userLoggedInAs = localStorage.getItem('userLoggedInAs');
    this.userRole = localStorage.getItem('userrole');
  }
  logout() {

    this.aunthetication.logout()
      .subscribe(logout => {
        this.logoutResponse = logout;
        localStorage.clear();
        console.log('What response was received at this point', logout);
        this.toast.success('Logout Successful');
        this.router.navigate(['/login']);
      });

  }

  public loadScript() {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }

    if (!isFound) {
      const dynamicScripts = ['assets/js/jquery.app.js'];

      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }

  }

}
