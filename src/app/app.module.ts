import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WindowRef } from './window-ref';
import {SharedModule } from './dropdown-components/shared.module';
import { MainModule } from './main-page/main-page.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    ContentAnimateDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    SharedModule,
    MainModule
  ],
  providers: [WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
