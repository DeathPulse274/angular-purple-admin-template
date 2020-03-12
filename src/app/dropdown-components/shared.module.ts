import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BootstrapSelectDirective } from './bootstrap-select.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    BootstrapSelectDirective,
  ],
  exports: [
    BootstrapSelectDirective,    
  ]
})
export class SharedModule { }
