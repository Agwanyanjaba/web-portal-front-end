import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import {FooterComponent} from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import { PartialsComponent } from './shared/partials/partials.component';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './services/authent.service';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from './services/config.service';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MerchantsService} from './services/merchant.service';
import {ActiveMerchantsComponent} from './merchants/active-merchants/active-merchants.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {InactiveMerchantsComponent} from './merchants/inactive-merchants/inactive-merchants.component';
import {PendingActivationComponent} from './merchants/pending-activation/pending-activation.component';
import {MerchantsDetailsComponent} from './merchants/merchants-details.component';
import {DataTablesModule} from 'angular-datatables';
import {SuiModule} from 'ng2-semantic-ui';
import {ChargesService} from './services/charges.service';
import {SettlementAccountService} from './services/settlementacct.service';
import {MerchantOutletService} from './services/merchantoutlet.service';
import {PartnerBouquetService} from './services/partnerbouquet.service';
import {ProgressBarModule} from 'angular-progress-bar';
import { SettlementInstructionsComponent } from './settlement-instructions/settlement-instructions.component';
import { SettlementInstructionsDetailsComponent } from './settlement-instructions-details/settlement-instructions-details.component';
import {SettlementService} from './services/settlement.service';
import { MakerPendingInstructionsComponent } from './maker-pending-instructions/maker-pending-instructions.component';
import { CheckerPendingInstructionsComponent } from './checker-pending-instructions/checker-pending-instructions.component';
import { UsersComponent } from './users/users.component';
import {UsersService} from './services/users.service';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    PartialsComponent,
    ActiveMerchantsComponent,
    InactiveMerchantsComponent,
    PendingActivationComponent,
    MerchantsDetailsComponent,
    SettlementInstructionsComponent,
    SettlementInstructionsDetailsComponent,
    MakerPendingInstructionsComponent,
    CheckerPendingInstructionsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    Ng2SearchPipeModule, // including into imports
    Ng2OrderModule, // importing the sorting package here
    NgxPaginationModule,
    DataTablesModule,
    SuiModule,
    ProgressBarModule
  ],
  providers: [
    AuthenticationService,
    MerchantsService,
    ConfigService,
    ChargesService,
    SettlementAccountService,
    MerchantOutletService,
    PartnerBouquetService,
    SettlementService,
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
