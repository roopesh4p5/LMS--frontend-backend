import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { UserloginComponent } from './user/userlogin/userlogin.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { HomeComponent } from './component/home/home.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { FooterComponent } from './component/footer/footer.component';
import { LeaveapprovalComponent } from './admin/leaveapproval/leaveapproval.component';
import { LeavedetailsComponent } from './admin/leavedetails/leavedetails.component';
import { ApplyleaveComponent } from './user/applyleave/applyleave.component';
import { MyleavesComponent } from './user/myleaves/myleaves.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserloginComponent,
    AdmindashboardComponent,
    HomeComponent,
    NotfoundComponent,
    UserdashboardComponent,
    AdduserComponent,
    FooterComponent,
    LeaveapprovalComponent,
    LeavedetailsComponent,
    ApplyleaveComponent,
    MyleavesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
