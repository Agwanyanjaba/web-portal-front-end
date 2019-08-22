import { Component, OnInit } from '@angular/core';
import {Search} from '../model/search';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ToastrService} from 'ngx-toastr';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersData; usersDataList: any;
  totalItems = 1;
  currentPage  = 1;
  maxSize  = 7; // pagination component size
  itemsPerPage = 10;
  numPages = 1;
  PageSize: number;
  allElements = 1;
  p = 1;
  search = new Search();
  loadingbtn; loadingapprovebtn: boolean;

  constructor(
    private userservice: UsersService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toast: ToastrService
  ) {
    this.loadingbtn = false;
    this.loadingapprovebtn = false;
  }

  ngOnInit() {
    this.currentPage = 1;
    this.pageChanged(this.currentPage);
  }
  pageChanged(currentPage) {
    const page = (currentPage - 1);
    this.spinnerService.show();
    this.userservice.getIEATAUsers(page)
      .subscribe(users => {
        this.usersData = users;
        this.usersDataList =  this.usersData.data.content;
        this.totalItems = this.usersData.data.totalElements;
        //    this.PageSize = this.merchantDetails.data.size;
        this.itemsPerPage = this.usersData.data.size;
        this.numPages = this.usersData.data.totalPages;
        this.allElements = this.usersData.data. totalElements;
        this.spinnerService.hide();

        console.log('The Settlement Instructions List are', this.usersDataList);
      });
  }
  setPayRefNo(payRefNo) {
    console.log('Select Ref No', payRefNo);
    localStorage.setItem('payrefno', payRefNo);
  }


  refresh(): void {
    setTimeout(() => {
      //  this.toast.success('House manager Approved');
      window.location.reload();
    }, 1000);
  }

}
