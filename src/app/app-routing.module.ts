import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ActiveMerchantsComponent} from './merchants/active-merchants/active-merchants.component';
import {InactiveMerchantsComponent} from './merchants/inactive-merchants/inactive-merchants.component';
import {PendingActivationComponent} from './merchants/pending-activation/pending-activation.component';
import {MerchantsDetailsComponent} from './merchants/merchants-details.component';
import {SettlementInstructionsComponent} from './settlement-instructions/settlement-instructions.component';
import {SettlementInstructionsDetailsComponent} from './settlement-instructions-details/settlement-instructions-details.component';
import {MakerPendingInstructionsComponent} from './maker-pending-instructions/maker-pending-instructions.component';
import {CheckerPendingInstructionsComponent} from './checker-pending-instructions/checker-pending-instructions.component';
import {UsersComponent} from './users/users.component';


const routes: Routes = [
  // { path: '', component: DashboardComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'settlement/instruction/list',  component: SettlementInstructionsComponent },
  { path: 'maker/settlement/instruction/list',  component: MakerPendingInstructionsComponent },
  { path: 'checker/settlement/instruction/list',  component: CheckerPendingInstructionsComponent },
  { path: 'view/users',  component: UsersComponent },
  { path: 'settlement/instruction/details/:payRefNo',  component: SettlementInstructionsDetailsComponent },
  { path: 'merchants/details/:merchantId',  component: MerchantsDetailsComponent },
  { path: 'active/merchants',  component: ActiveMerchantsComponent },
  { path: 'inactive/merchants',  component: InactiveMerchantsComponent },
  { path: 'pending/activation',  component: PendingActivationComponent },
   // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
