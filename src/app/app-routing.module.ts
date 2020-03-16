import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MainComponent } from './main-page/main-page.component';
import { MainComponentComponent } from './main-page/main-component/main-component.component';
import { CloudAccountComponent } from './main-page/cloud-account/cloud-account.component';
import {PreferencesComponent } from './main-page/preferences/preferences.component';
import { OraganisationProfileComponent } from './main-page/oraganisation-profile/oraganisation-profile.component';
import { UserRolesComponent } from './main-page/user-roles/user-roles.component';
import { EnableLogsComponent } from './main-page/enable-logs/enable-logs.component';
import { LogsComponent } from './main-page/logs/logs.component';
import { CloudFrontComponent } from './main-page/logs/cloud-front/cloud-front.component';
import { CloudTrailComponent } from  './main-page/logs/cloud-trail/cloud-trail.component';
import { AlbComponent } from './main-page/logs/alb/alb.component';
import { ElbComponent } from './main-page/logs/elb/elb.component';
import { S3Component } from './main-page/logs/s3/s3.component';
import { VpcComponent } from './main-page/logs/vpc/vpc.component';
import { GuardDutyComponent } from './main-page/logs/guard-duty/guard-duty.component';
import { InspectorComponent } from './main-page/logs/inspector/inspector.component';
import { ChangeManagementComponent } from './main-page/logs/change-management/change-management.component'
import { UtilizationComponent } from './main-page/logs/utilization/utilization.component';
import { BestPracticesComponent } from './main-page/best-practices/best-practices.component';
import { CostInsightsComponent } from './main-page/cost-insights/cost-insights.component';
import { ExplorerComponent } from './main-page/cost-insights/explorer/explorer.component';
import { InvoicesComponent } from './main-page/cost-insights/invoices/invoices.component';
import { CostComparisonComponent } from './main-page/cost-insights/cost-comparison/cost-comparison.component';
import { CostSavingsComponent } from './main-page/cost-insights/cost-savings/cost-savings.component';
import { AutomationComponent } from './main-page/automation/automation.component';
import { SnapshotComponent } from './main-page/automation/snapshot/snapshot.component';
import { TaggingComponent } from './main-page/automation/tagging/tagging.component';
import { StartStopComponent } from './main-page/automation/start-stop/start-stop.component';



const routes: Routes = [
  { path: '', redirectTo: '/user-pages/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path : 'application', component: MainComponent,
          children:
          [ 
            {path: 'main-component',component:MainComponentComponent},
            {path: 'cloud-account', component:CloudAccountComponent},
            {path: 'preferences' , component:PreferencesComponent},
            {path: 'organisation-profile', component: OraganisationProfileComponent},
            {path: 'user-roles', component: UserRolesComponent},
            {path: 'enable-logs', component: EnableLogsComponent},
            {path: 'logs', component : LogsComponent,
              children:[
                {path:'cloud-front', component: CloudFrontComponent},
                {path:'cloud-trail', component:CloudTrailComponent},
                {path:'alb',component:AlbComponent},
                {path:'elb',component:ElbComponent},
                {path:'s3',component:S3Component},
                {path:'vpc',component:VpcComponent},
                {path:'guard-duty',component:GuardDutyComponent},
                {path:'inspector',component:InspectorComponent},
                {path:'utilization',component:UtilizationComponent},
                {path:'change-management',component:ChangeManagementComponent}
              ]
            },
            {path:'best-practices',component:BestPracticesComponent},
            {path:'cost-insights', component:CostInsightsComponent,
              children:[
                {path:'explorer',component:ExplorerComponent},
                {path:'invoices',component:InvoicesComponent},
                {path:'cost-comparison',component:CostComparisonComponent},
                {path:'cost-savings',component:CostSavingsComponent}
              ]
            },
            {path:'automation',component:AutomationComponent,
              children:[
                {path:'start-stop',component:StartStopComponent},
                {path:'tagging',component:TaggingComponent},
                {path:'snapshot',component:SnapshotComponent}
              ]
            }
          ]
  },
 // { path : 'main-page', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
