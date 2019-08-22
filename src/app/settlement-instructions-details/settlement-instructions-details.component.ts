import { Component, OnInit } from '@angular/core';
import {SettlementService} from '../services/settlement.service';
import {ActivatedRoute} from '@angular/router';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-settlement-instructions-details',
  templateUrl: './settlement-instructions-details.component.html',
  styleUrls: ['./settlement-instructions-details.component.css']
})
export class SettlementInstructionsDetailsComponent implements OnInit {
  payref; instruction_details; instruction_details_data: any;
  approvalprogress: number;
  settlementInstructions; settlementInstructionsList: any;
  loadingbtn: boolean;
  userRole: any;
  loadingapprovebtn: boolean;

  constructor(private route: ActivatedRoute,
              private settlementService: SettlementService,
              private toast: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService) {
    this.loadingbtn = false;
    this.loadingapprovebtn = false;
  }

  ngOnInit() {
    this.payref = this.route.snapshot.params['payRefNo'];
    localStorage.setItem('payRefNo', this.payref);
    this.settlemeDetails(this.payref);
    this.approvalprogress = 50;
    this.userRole = localStorage.getItem('userrole');
  }

  setProgress() {
    this.approvalprogress = this.approvalprogress + 13;
  }

  settlemeDetails(payref) {
       this.settlementService.getSettlementInstructionDetails(payref)
      .subscribe(settlementinstructionsdetails => {
        this.instruction_details = settlementinstructionsdetails;
        this.instruction_details_data = this.instruction_details.data;
        console.log('The Settlement Instructions List Details', this.instruction_details_data);
      });
  }
  makerApproveSettlement(payRefNo) {
    this.loadingbtn = true;
    this.spinnerService.show();
    this.settlementService.makerApproveDetails(payRefNo)
      .subscribe(settlementinstructions => {
        this.settlementInstructions = settlementinstructions;
        if (this.settlementInstructions.status === 'Success') {
          this.toast.success('Approved Successfully');
          this.loadingapprovebtn = false;
          this.loadingbtn = false;
          this.refresh();
        } else {
          this.toast.error('Approval was not successful');
          this.loadingapprovebtn = false;
          this.loadingbtn = false;
        }
      });
  }

  checkerApproveSettlement(payRefNo) {
    this.loadingapprovebtn = true;
     this.loadingbtn = true;
    this.spinnerService.show();
    this.settlementService.checkerApproveDetails(payRefNo)
      .subscribe(settlementinstructions => {
        this.settlementInstructions = settlementinstructions;
        if (this.settlementInstructions.status === 'Success') {
          this.toast.success('Approved Successfully');
          this.loadingapprovebtn = false;
          this.loadingbtn = false;
          this.refresh();
        } else {
          this.toast.error('Approval was not successful');
          this.loadingapprovebtn = false;
          this.loadingbtn = false;
        }
      });
  }

  refresh(): void {
    setTimeout(() => {
      //  this.toast.success('House manager Approved');
      window.location.reload();
    }, 1000);
  }

  setPayRefNo(payRefNo) {
    console.log('Select Ref No', payRefNo);
    localStorage.setItem('payrefno', payRefNo);
  }

}
