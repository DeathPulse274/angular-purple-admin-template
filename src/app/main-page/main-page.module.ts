import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponentComponent } from './main-component/main-component.component';
import { MainComponent } from './main-page.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CloudAccountComponent } from './cloud-account/cloud-account.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { OraganisationProfileComponent } from './oraganisation-profile/oraganisation-profile.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { EnableLogsComponent } from './enable-logs/enable-logs.component';
import { LogsComponent } from './logs/logs.component';
import { CloudFrontComponent } from './logs/cloud-front/cloud-front.component';
import { CloudTrailComponent } from './logs/cloud-trail/cloud-trail.component';
import { AlbComponent } from './logs/alb/alb.component';
import { S3Component } from './logs/s3/s3.component';
import { VpcComponent } from './logs/vpc/vpc.component';
import { GuardDutyComponent } from './logs/guard-duty/guard-duty.component';
import { InspectorComponent } from './logs/inspector/inspector.component';
import { UtilizationComponent } from './logs/utilization/utilization.component';
import { ChangeManagementComponent } from './logs/change-management/change-management.component';
import { ElbComponent } from './logs/elb/elb.component';


const routes: Routes = [
  {path : 'main-component' , component : MainComponentComponent},
]

@NgModule({
  declarations: [ 
    MainComponentComponent,
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    SpinnerComponent,
    CloudAccountComponent,
    PreferencesComponent,
    OraganisationProfileComponent,
    UserRolesComponent,
    EnableLogsComponent,
    LogsComponent,
    CloudFrontComponent,
    CloudTrailComponent,
    AlbComponent,
    S3Component,
    VpcComponent,
    GuardDutyComponent,
    InspectorComponent,
    UtilizationComponent,
    ChangeManagementComponent,
    ElbComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
  ]
})

export class MainModule {

}
