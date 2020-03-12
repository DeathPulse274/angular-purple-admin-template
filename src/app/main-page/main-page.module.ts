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
    EnableLogsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
  ]
})

export class MainModule {

}
