import { MerchantOutletService } from './../services/merchantoutlet.service';
import { SettlementAccountService } from './../services/settlementacct.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {MerchantsService} from '../services/merchant.service';
import {Subject} from 'rxjs';
import {ChargesService} from '../services/charges.service';
import {ToastrService} from 'ngx-toastr';
import {PartnerBouquetService} from '../services/partnerbouquet.service';


@Component({
  selector: 'app-merchants-details',
  templateUrl: './merchants-details.component.html',
  styleUrls: ['./merchants-details.component.css']
})
export class MerchantsDetailsComponent implements OnInit {
  id: number;
  merchantDetails; bouquetDetails; merchantSingleDetails; merchantPersonalDetails: any;
  chargeDetails; chargeDetailsResponse; bouquetDetailsResponse; settlementAcctDetails; settlementAcctResponse; charges; chargesResponse; dataPayload: any;
  merchantoutltDetails; merchantoutltResponse: any;
  editmerchantoutletmid; editmerchantoutletmidResponse: any;
  specificMerchantCharge: any;
  outletPayload: any;
  merchantMids; merchantsMidsResponse: any;
  accountId; outletId: any;
  assignChargePayload; activateSettlementAccountPayload: any;
  merchantEditDetails; approveDetails; approveDetailsResponse: any;
  loadingbtn; loadingapprovebtn; loadingrejectbtn; loadingreturnbtn: boolean;
  secured: boolean;
  viewMode = 'tab2';
  activeTab = 'services';
  approvalprogress: number;
  securityDetails; securityDetailsResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute,
              private spinnerService: Ng4LoadingSpinnerService,
              private merchantservice: MerchantsService,
              private partnerBouquetService: PartnerBouquetService,
              private chargesService: ChargesService,
              private toast: ToastrService,
              private settlemntactservice: SettlementAccountService,
              private merchantOuletservice: MerchantOutletService
  ) {
    this.loadingbtn = false;
    this.loadingapprovebtn = false;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['merchantId'];
    this.getMerchantDetails(this.id);
    this.getActiveMerchantCharges();
    this.getAllMerchantMids();
    this.getActiveMerchantOutletDetails();
    this.approvalprogress = 22;
  }

  setProgress() {
    this.approvalprogress = this.approvalprogress + 13;
   }
  getMerchantDetails(id) {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 0,
      processing: true
    };
    this.spinnerService.show();
    this.merchantservice.getMerchantDetails(id)
      .subscribe(merchantsdetails => {
        this.merchantDetails = merchantsdetails;
        this.merchantSingleDetails = this.merchantDetails.data;
        this.merchantPersonalDetails = this.merchantSingleDetails.merchantDetail;
        localStorage.setItem('merchantCode', this.merchantPersonalDetails.merchantCode);
        this.dtTrigger.next();
        this.spinnerService.hide();
        localStorage.setItem('outletId', this.merchantSingleDetails.merchantOutlet[0].id);
        console.log('The Merchant Details are', this.merchantSingleDetails);
        console.log('The Merchant Personal Details are', this.merchantPersonalDetails);
        this.getActiveMerchantChargeDetails(this.merchantPersonalDetails.merchantCode);
        this.secured =   this.merchantSingleDetails.merchantDetail.enforce3DS;
      });
   }

  getActiveMerchantCharges() {
    this.chargesService.getActiveMerchantCharges()
      .subscribe(chargesdetails => {
        this.chargeDetails = chargesdetails;
        this.charges = this.chargeDetails.data;
        console.log('The Charges Details are', this.charges);
      });
  }

  getChargeCode(chargeCode) {
    localStorage.setItem('chargeId', chargeCode);
    console.log('selected charge Id', chargeCode);
  }

  getStatus(status) {
    localStorage.setItem('status', status);
    console.log('selected Status', status);
  }

  assignMerchantCharge(merchantDetails) {
    this.loadingbtn = true;
    this.assignChargePayload = {
      'token': localStorage.getItem('token'),
      'chargeId': merchantDetails.chargeCode,
      'status':  merchantDetails.status,
      'description':  merchantDetails.description,
      'merchant': {
        'merchantCode': localStorage.getItem('merchantCode')
      }
  };

      this.chargesService.assignActiveMerchantsCharge(this.assignChargePayload)
      .subscribe(chargesdetails => {
        this.chargeDetails = chargesdetails;
        this.chargeDetailsResponse = this.chargeDetails.data;
        console.log('Charge Details', this.chargeDetails);
        if (this.chargeDetailsResponse.status.type === true) {
          this.charges = this.chargeDetails.data;
          this.loadingbtn = false;
          this.toast.success(this.chargeDetails.status.description);
          setTimeout(() => {
            this.refresh();
          }, 500);
          console.log('The Charges Details are', this.charges);
        } else {
          this.loadingbtn = false;
          this.toast.error(this.chargeDetails.status.description);
          setTimeout(() => {
            this.refresh();
          }, 500);

        }
     });
    }
    getActiveMerchantChargeDetails(merchantCode) {
      this.dataPayload = {
        'merchant': {
          'merchantCode': merchantCode
        }
      };
      this.assignChargePayload = {
        'token': localStorage.getItem('token'),
        'data': this.dataPayload
      };
      this.chargesService.getActiveMerchantChargeDetails(this.assignChargePayload)
        .subscribe(chargesdetails => {
          this.chargeDetails = chargesdetails;
          this.specificMerchantCharge = this.chargeDetails.data;
          console.log('The Charges Details are', this.specificMerchantCharge[0]);
          this.merchantEditDetails = this.specificMerchantCharge[0];
          console.log('Edit Details', this.specificMerchantCharge);
         // this.merchantDetails.description = this.charges[0].description;
        });
    }

    setConfigId(configId) {
      console.log('Selected configId', configId);
      localStorage.setItem('configId', configId);
    }

  setSettlementAccount(accountId) {
    console.log('Selected accountId', accountId);
    localStorage.setItem('accountId', accountId);
   }

  editActiveMerchantChargeDetails(chargeDetails) {
    this.loadingbtn = true;
    this.dataPayload = {
      'configId': localStorage.getItem('configId'),
      'chargeId': chargeDetails.chargeCode,
      'description': chargeDetails.description
    };
    this.assignChargePayload = {
      'token': localStorage.getItem('token'),
      'data': this.dataPayload
    };

    this.chargesService.editActiveMerchantChargeDetails(this.assignChargePayload)
      .subscribe(chargesdetails => {
        this.chargeDetails = chargesdetails;
        this.chargesResponse = this.chargeDetails.status;
        console.log('The Charges Details are', this.chargesResponse);
      if (this.chargesResponse.type === true) {
        this.loadingbtn = false;
        this.toast.success(this.chargesResponse.description);

        setTimeout(() => {
          this.refresh();
        }, 500);

      } else {
        this.loadingbtn = false;
        this.toast.error('Charges not Updated');
        setTimeout(() => {
          this.refresh();
        }, 500);
      }

      });
  }

  approveService() {
    this.loadingbtn = true;
    this.dataPayload = {
      'bouquetId': localStorage.getItem('serviceId')
    };
      this.assignChargePayload = {
      'token': localStorage.getItem('token'),
      'data': this.dataPayload,

    };
    this.partnerBouquetService.approveBouquetService(this.assignChargePayload)
      .subscribe(details => {
        this.bouquetDetails = details;
        this.bouquetDetailsResponse = this.bouquetDetails.status;
        console.log('The Bouquet Details are', this.bouquetDetailsResponse);
        if (this.bouquetDetailsResponse.type === true) {
          this.loadingbtn = false;
          this.toast.success(this.bouquetDetailsResponse.description);
          setTimeout(() => {
            this.refresh();
          }, 500);
        } else {
          this.loadingbtn = false;
          this.toast.error(this.bouquetDetailsResponse.description);
          setTimeout(() => {
            this.refresh();
          }, 500);
        }
      });
  }

  setOutletId(outletid) {
    console.log('What is the outlet id', outletid);
    localStorage.setItem('outletId', outletid );
  }

  setServiceId(id) {
    console.log('What is the service id', id);
    localStorage.setItem('serviceId', id );
  }

  public onSaveSecuredChanged(value: boolean) {
    this.secured = value;
    console.log('Value Checked', this.secured);
  }

 activateMerchantSettlementAccount() {
      this.loadingbtn = true;
      this.accountId =  { accountid: Number(localStorage.getItem('accountId')) };
      const tokeni = localStorage.getItem('token');
      const userinfo = ({token: tokeni, data: this.accountId });
      this.settlemntactservice.enableMerchantSettlementAccount(userinfo)
      .subscribe(details => {
        this.settlementAcctDetails = details;
        this.settlementAcctResponse = this.settlementAcctDetails.status;
        console.log('The Settlement Account Details are', this.settlementAcctResponse);
      if (this.settlementAcctResponse.type === true) {
        this.loadingbtn = false;
        this.toast.success(this.settlementAcctResponse.description);
        setTimeout(() => {
          this.refresh();
        }, 500);
      } else {
        this.loadingbtn = false;
        this.toast.error(this.settlementAcctResponse.description);
        setTimeout(() => {
          this.refresh();
        }, 500);
      }
    });
}

disableMerchantSettlementAccount() {
  this.loadingbtn = true;
  this.accountId = { accountid: Number(localStorage.getItem('accountId'))};
  const tokeni = localStorage.getItem('token');
  const userinfo = ({token: tokeni, data: this.accountId });
  this.settlemntactservice.disableMerchantSettlementAccount(userinfo)
  .subscribe(details => {
    this.settlementAcctDetails = details;
    this.settlementAcctResponse = this.settlementAcctDetails.status;
    console.log('The Settlement Account Details are', this.settlementAcctResponse);
  if (this.settlementAcctResponse.type === true) {
    this.loadingbtn = false;
    this.toast.success(this.settlementAcctResponse.description);
    setTimeout(() => {
      this.refresh();
    }, 500);
  } else {
    this.loadingbtn = false;
    this.toast.error(this.settlementAcctResponse.description);
    setTimeout(() => {
      this.refresh();
    }, 500);
  }
});
}

getActiveMerchantOutletDetails() {
  this.outletId = Number(localStorage.getItem('outletId'));
  this.outletPayload = ({outletId: this.outletId});
  const tokeni = localStorage.getItem('token');
  const userinfo = ({token: tokeni, data: this.outletPayload });
  this.merchantOuletservice.getActiveMerchantOutletDetails(userinfo)
  .subscribe(details => {
    this.merchantoutltDetails = details;
    this.merchantoutltResponse = this.merchantoutltDetails.data;

   if (this.merchantoutltDetails.status.type === true) {
     this.merchantoutltResponse = this.merchantoutltDetails.data;
     console.log('The Merchant Outlet Details are', this.merchantoutltResponse);
  } else {
     this.merchantoutltResponse = null;
     this.merchantoutltResponse.outletName = null;
     this.merchantoutltResponse.outletCode = null;
     this.merchantoutltResponse.address = null;
     this.merchantoutltResponse.location = null;
     console.log('The Merchant Outlet Details are', this.merchantoutltResponse);
    // this.toast.error(this.merchantoutltResponse.description);
    // setTimeout(() => {
    //   this.refresh();
    // }, 500);
  }
});
}

getAllMerchantMids() {
  const tokeni = localStorage.getItem('token');
  const userinfo = ({token: tokeni});
  this.merchantOuletservice.getAllMerchantMids(userinfo)
  .subscribe(details => {
    this.merchantMids = details;
    this.merchantsMidsResponse = this.merchantMids.status;
    console.log('The Merchant MIds Details are', this.merchantMids.data);
  if (this.merchantsMidsResponse.type === true) {
    // this.toast.success(this.merchantsMidsResponse.description);
    // setTimeout(() => {
    //   this.refresh();
    // }, 500);
  } else {
 //   this.toast.error(this.merchantsMidsResponse.description);
    // setTimeout(() => {
    //   this.refresh();
    // }, 500);
  }
});
}

editActiveMerchantOutletMids(merchantOutletDetails) {
  this.loadingbtn = true;
  const tokeni = localStorage.getItem('token');
  this.dataPayload = {
    'outletId': merchantOutletDetails.id,
    'midId': merchantOutletDetails.mid
  };

  const userinfo = ({token: tokeni, data: this.dataPayload});
  this.merchantOuletservice.editActiveMerchantOutletMid(userinfo)
  .subscribe(details => {
    this.editmerchantoutletmid = details;
    this.editmerchantoutletmidResponse = this.editmerchantoutletmid.status;
    console.log('The Merchant MID Edit Details are',  this.editmerchantoutletmid);
  if (this.editmerchantoutletmidResponse.type === true) {
    this.loadingbtn = false;
    this.toast.success(this.editmerchantoutletmidResponse.description);
    setTimeout(() => {
      this.refresh();
    }, 500);
  } else {
    this.loadingbtn = false;
    this.toast.error(this.editmerchantoutletmidResponse.description);
    setTimeout(() => {
      this.refresh();
    }, 500);
  }
});

}

  enforceSecurity(value: boolean) {
    const tokeni = localStorage.getItem('token');
    this.dataPayload = {
      'merchantCode': localStorage.getItem('merchantCode'),
     };

    const userinfo = ({token: tokeni, data: this.dataPayload});
    this.merchantservice.configureSecurity(userinfo)
      .subscribe(details => {
        this.securityDetails = details;
        this.securityDetailsResponse = this.securityDetails.status;
        console.log('The Security Details are',  this.securityDetails);
        if (this.securityDetailsResponse.type === true) {
          this.toast.success(this.securityDetailsResponse.description);
          setTimeout(() => {
            this.refresh();
          }, 500);
        } else {
          this.loadingbtn = false;
          this.toast.error(this.securityDetailsResponse.description);
          setTimeout(() => {
            this.refresh();
          }, 500);
        }
      });

  }

  makerApproveMerchant(approved, returned, merchantdetails) {
    this.loadingapprovebtn = true;
    console.log('Settlement Duration', merchantdetails.settlementDuration[0]);
    console.log('Description ', merchantdetails.description);
    console.log('Secured ', merchantdetails.secured );
    console.log('Decision', approved);
    console.log('Returned', returned);
    const tokeni = localStorage.getItem('token');
    this.dataPayload = {
      'merchantCode': localStorage.getItem('merchantCode'),
      'comments': merchantdetails.description,
      'approved': approved,
      'returned': returned,
      };

    const userinfo = ({token: tokeni, data: this.dataPayload});
    this.merchantservice.makerApproveMerchant(userinfo)
      .subscribe(details => {
        this.approveDetails = details;
        this.approveDetailsResponse = this.approveDetails.status;
        if (this.approveDetailsResponse.type === true) {
          this.loadingapprovebtn = false;
          this.toast.success(this.approveDetailsResponse.description);
          // setTimeout(() => {
          //   this.refresh();
          // }, 500);
        } else {
          this.loadingapprovebtn = false;
          this.toast.error(this.approveDetailsResponse.description);
          // setTimeout(() => {
          //   this.refresh();
          // }, 500);
        }
      });

  }

  makerRejectMerchant(approved, returned, merchantdetails) {
    this.loadingrejectbtn = true;
    console.log('Settlement Duration', merchantdetails.settlementDuration[0]);
    console.log('Description ', merchantdetails.description);
    console.log('Secured ', merchantdetails.secured );
    console.log('Decision', approved);
    console.log('Returned', returned);
    const tokeni = localStorage.getItem('token');
    this.dataPayload = {
      'merchantCode': localStorage.getItem('merchantCode'),
      'comments': merchantdetails.description,
      'approved': approved,
      'returned': returned,
    };

    const userinfo = ({token: tokeni, data: this.dataPayload});
    this.merchantservice.makerApproveMerchant(userinfo)
      .subscribe(details => {
        this.approveDetails = details;
        this.approveDetailsResponse = this.approveDetails.status;
        if (this.approveDetailsResponse.type === true) {
          this.loadingrejectbtn = false;
          this.toast.success(this.approveDetailsResponse.description);
          // setTimeout(() => {
          //   this.refresh();
          // }, 500);
        } else {
          this.loadingrejectbtn = false;
          this.toast.error(this.approveDetailsResponse.description);
          // setTimeout(() => {
          //   this.refresh();
          // }, 500);
        }
      });

  }

  makerReturnMerchant(approved, returned, merchantdetails) {
    this.loadingreturnbtn = true;
    console.log('Settlement Duration', merchantdetails.settlementDuration[0]);
    console.log('Description ', merchantdetails.description);
    console.log('Secured ', merchantdetails.secured );
    console.log('Decision', approved);
    console.log('Returned', returned);
    const tokeni = localStorage.getItem('token');
    this.dataPayload = {
      'merchantCode': localStorage.getItem('merchantCode'),
      'comments': merchantdetails.description,
      'approved': approved,
      'returned': returned,
    };

    const userinfo = ({token: tokeni, data: this.dataPayload});
    this.merchantservice.makerApproveMerchant(userinfo)
      .subscribe(details => {
        this.approveDetails = details;
        this.approveDetailsResponse = this.approveDetails.status;
        if (this.approveDetailsResponse.type === true) {
          this.loadingreturnbtn = false;
          this.toast.success(this.approveDetailsResponse.description);
          // setTimeout(() => {
          //   this.refresh();
          // }, 500);
        } else {
          this.loadingreturnbtn = false;
          this.toast.error(this.approveDetailsResponse.description);
          // setTimeout(() => {
          //   this.refresh();
          // }, 500);
        }
      });

  }




  refresh(): void {
    window.location.reload();
  }
   showPdf(fileContent, documentType, mimetype, yes) {
   const linkSource = 'data:application/' + 'jpeg' + ';base64,' + fileContent;
   const downloadLink = document.createElement('a');
    const fileName = documentType;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
