import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-rounting.module';
import { ConversionListComponent } from 'src/app/components/conversion-list/conversion-list.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ConversionListComponent
  ],
  exports: [
    
  ]
})

export class DashboardModule { }
