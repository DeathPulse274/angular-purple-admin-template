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
            {path: 'enable-logs', component: EnableLogsComponent}
          ]
  }
 // { path : 'main-page', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
