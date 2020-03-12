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


const routes: Routes = [
  {path : 'main-component' , component : MainComponentComponent},
  {path : 'main-component' , component : MainComponentComponent}
]

@NgModule({
  declarations: [ 
    MainComponentComponent,
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
  ]
})

export class MainModule {

}
