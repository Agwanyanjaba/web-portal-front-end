import { Component, OnInit } from '@angular/core';
import {Search} from '../model/search';
import {SettlementService} from '../services/settlement.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-maker-pending-instructions',
  templateUrl: './maker-pending-instructions.component.html',
  styleUrls: ['./maker-pending-instructions.component.css']
})
export class MakerPendingInstructionsComponent implements OnInit {

  settlementInstructions; settlementInstructionsList: any;
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
    private settlementService: SettlementService,
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
    this.settlementService.getMakerPendingSettlementInstructionList(page)
      .subscribe(settlementinstructions => {
        this.settlementInstructions = settlementinstructions;
        this.settlementInstructionsList =  this.settlementInstructions.data.content;
        this.totalItems = this.settlementInstructions.data.totalElements;
        //    this.PageSize = this.merchantDetails.data.size;
        this.itemsPerPage = this.settlementInstructions.data.size;
        this.numPages = this.settlementInstructions.data.totalPages;
        this.allElements = this.settlementInstructions.data. totalElements;
        this.spinnerService.hide();

        console.log('The Maker Settlement Instructions List are', this.settlementInstructionsList);
      });
  }
  setPayRefNo(payRefNo) {
    console.log('Select Ref No', payRefNo);
    localStorage.setItem('payrefno', payRefNo);
  }
  approveSettlement() {
    this.loadingbtn = true;
    this.spinnerService.show();
    this.settlementService.makerApproveDetails(localStorage.getItem('payrefno'))
      .subscribe(settlementinstructions => {
        this.settlementInstructions = settlementinstructions;
        if (this.settlementInstructions.status === 'Success') {
          this.loadingbtn = false;
          this.toast.success('Approved Successfully');
          this.refresh();
        } else {
          this.toast.error('Approval was not successful');
          this.loadingbtn = false;
        }
        this.settlementInstructionsList =  this.settlementInstructions.data.content;
        this.totalItems = this.settlementInstructions.data.totalElements;
        //    this.PageSize = this.merchantDetails.data.size;
        this.itemsPerPage = this.settlementInstructions.data.size;
        this.numPages = this.settlementInstructions.data.totalPages;
        this.allElements = this.settlementInstructions.data. totalElements;
        this.spinnerService.hide();

        console.log('The Settlement Instructions List are', this.settlementInstructionsList);
      });
  }

  refresh(): void {
    setTimeout(() => {
      //  this.toast.success('House manager Approved');
      window.location.reload();
    }, 1000);
  }

}
