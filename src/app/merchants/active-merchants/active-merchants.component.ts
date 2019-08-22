import { Component, OnInit } from '@angular/core';
import {MerchantsService} from '../../services/merchant.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Search} from '../../model/search';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-active-merchants',
  templateUrl: './active-merchants.component.html',
  styleUrls: ['./active-merchants.component.css']
})
export class ActiveMerchantsComponent implements OnInit {
  merchantDetails; activeMerchants: any;
  totalItems = 1;
  currentPage  = 1;
  maxSize  = 7; // pagination component size
  itemsPerPage = 10;
  numPages = 1;
  PageSize: number;
  allElements = 1;
   p = 1;
   search = new Search();

  constructor(
          private merchantservice: MerchantsService,
          private spinnerService: Ng4LoadingSpinnerService,
          private toast: ToastrService
  ) { }

  ngOnInit() {
    this.currentPage = 1;
    this.pageChanged(this.currentPage);
    }


  pageChanged(currentPage) {
    const page = (currentPage - 1);
    this.spinnerService.show();
    this.merchantservice.getActiveMerchants(page)
      .subscribe(merchants => {
        this.merchantDetails = merchants;
        this.activeMerchants =  this.merchantDetails.data.content;
        this.totalItems = this.merchantDetails.data.totalElements;
    //    this.PageSize = this.merchantDetails.data.size;
        this.itemsPerPage = this.merchantDetails.data.size;
        this.numPages = this.merchantDetails.data.totalPages;
        this.allElements = this.merchantDetails.data. totalElements;
        this.spinnerService.hide();

        console.log('The Merchant Details are', this.merchantDetails);
        });
  }

  searchMerchantDetails(search) {
    if (search.merchantName === undefined && search.merchantCode === undefined && search.merchantEmailAddress === undefined) {
      console.log('Stepped in A');
      this.toast.error('Enter at least one search param ');
    } else {
      this.spinnerService.show();
      this.merchantservice.searchMerchantDetails(this.search)
        .subscribe(merchants => {
          this.merchantDetails = merchants;
          this.activeMerchants = this.merchantDetails.data.content;
          this.totalItems = this.merchantDetails.data.totalElements;
          //    this.PageSize = this.merchantDetails.data.size;
          this.itemsPerPage = this.merchantDetails.data.size;
          this.numPages = this.merchantDetails.data.totalPages;
          this.allElements = this.merchantDetails.data.totalElements;
          this.spinnerService.hide();

          console.log('The Search Merchant Details are', this.merchantDetails);
        });
    }
  }
  resetSearch() {
    this.search.merchantEmailAddress = '';
    this.search.merchantCode = '';
    this.search.merchantName = '';
    this.pageChanged(1);
  }

  setMerchantCode(merchantCode) {
    localStorage.setItem('merchantCode', merchantCode);
  }



}
