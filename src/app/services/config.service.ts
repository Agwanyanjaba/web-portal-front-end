import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
    // BaseUrl = 'https://eazzycheckout.equitybankgroup.com:8443/api.eazzycheckout~portal/v1/';
    // BaseUrl: any = 'https://10.1.9.100:7777/api.eazzycheckout~portal/v1/';
    BaseUrl: any = 'http://localhost:8083/esb/services/bankers/';
    url: any ;
    /** USERS **/
    GETUSERS: any = 'listAllUsers';
    GETUSER: any = 'listUser';
    CREATENEWUSER: any = 'users/createNewUser';
    // GETUSERBYID: any = 'users/getUserById';
    EDITUSER: any = 'users/editUser';
    DELETEUSER: any = 'users/deleteUser';
    GETUSERSBYID: any = 'users/getUserById';
    USERSLOGIN: any = 'login';
    USERSLOGOUT: any = 'logout';
    UPDATEUSERROLE: any = 'updateUserRole';

    /** MERCHANTS **/
    GETACTIVEMERCHANTS: any = 'listAllActiveMerchants';
    GETINACTIVEMERCHANTS: any = 'listAllInactiveMerchants';
    GETMERCHANTSPENDINGACTIVATION: any = 'listAllMerchantsPendingActivation';
    GETMERCHANTDETAILS: any = 'listMerchant';
    SEARCHMERCHANTDETAILS: any = 'searchMerchantByParams';
    GETACTIVEMERCHANTCHARGES: any = 'listAllActiveCharges';
    ASSIGNMERCHANTCHARGES: any = 'createActiveMerchantCharge';
    GETACTIVEMERCHANTCHARGESDETAILS: any  = 'getActiveMerchantChargeDetails';
    EDITACTIVEMERCHANTCHARGESDETAILS: any  = 'editActiveMerchantCharge';
    ENABLEMERCHANTSETTLEMENTACCOUNT: any = 'activateSettlementAccount';
    DISABLEMERCHANTSETTLEMENTACCOUNT: any = 'disableSettlementAccount';
    GETACTIVEMERCHANTOUTLETDETAILS: any = 'listActiveMerchantOutletDetails';
    GETALLMERCHANTMID: any = 'listAllMerchantMid';
    EDITACTIVEMERCHANTOUTLETMID: any = 'editActiveMerchantOutletMid';
    APPROVEBOUQUETSERVICE: any = 'approveBouquetService';
    CONFIGURESECURITY: any = 'configureMerchant3DS';
    MAKERAPPROVEMERCHANTREGISTRATION: any = 'maker/approveMerchantRegistration';

  /** SETTLEMENT INSTRUCTIONS ** /
   *
   */
    GETSETTLEMENTINSTRUCTIONS: any = 'listSettlementInstructionList';
    GETMAKERPENDINGSETTLEMENTINSTRUCTIONS: any = 'listMakerPendingSettlementInstructionList';
    GETCHECKERPENDINGSETTLEMENTINSTRUCTIONS: any = 'listCheckerPendingSettlementInstructionList';
    GETSETTLEMENTINSTRUCTIONSDETAILS: any = 'listSettlementInstructionDetails';
    MAKERAPPROVESETTLEMENTINSTRUCTIONS: any = 'makerSubmitSettlement';
    CHECKERAPPROVESETTLEMENT: any = 'checkerSettlement';

    /** IEATTA USERS **/
    GETIEATTAUSERS = 'listUsers';
    GETIEATTAUSERSDETAILS = 'listUsersDetails';
    EDITIEATTAUSERS = 'editUsersDetails';


}
