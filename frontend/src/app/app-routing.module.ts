import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { UserloginComponent } from './user/userlogin/userlogin.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { LeaveapprovalComponent } from './admin/leaveapproval/leaveapproval.component';
import { LeavedetailsComponent } from './admin/leavedetails/leavedetails.component';
import { ApplyleaveComponent } from './user/applyleave/applyleave.component';
import { MyleavesComponent } from './user/myleaves/myleaves.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: UserloginComponent },
  { path: 'admindashboard/adduser', component: AdduserComponent },
  { path: 'admindashboard/leaveapproval', component: LeaveapprovalComponent },
  { path: 'admindashboard/leavedetails', component: LeavedetailsComponent },
  { path: 'admindashboard', component: AdmindashboardComponent },
  { path: 'userdashboard', component: UserdashboardComponent },
  { path: 'userdashboard/applyleave', component: ApplyleaveComponent },
  { path: 'userdashboard/myleave', component: MyleavesComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: '**', component: NotfoundComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
