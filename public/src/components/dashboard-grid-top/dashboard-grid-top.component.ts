import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversion, Subscription } from '../../lib/types';
import { DashboardDataComponent } from '../dashboard-data/dashboard-data.component';
import { DashboardMonthComponent } from '../dashboard-month/dashboard-month.component';
import { DashboardPlanComponent } from '../dashboard-plan/dashboard-plan.component';

@Component({
  selector: 'app-dashboard-grid-top',
  standalone: true,
  imports: [CommonModule, DashboardDataComponent, DashboardMonthComponent, DashboardPlanComponent],
  templateUrl: './dashboard-grid-top.component.html',
  styleUrl: './dashboard-grid-top.component.css'
})
export class DashboardGridTopComponent implements OnInit{
  @Input() userConversions: Conversion[] = [];
  @Input() userSubscription: Subscription = {} as Subscription;
  @Input() loading: boolean = true;

  ngOnInit(): void {
    
  }
  
  getConversionCount(): number {
    return this.userConversions.length;
  }

  getConversionLimit(): number {
    return this.userSubscription.limit;
  }

  getConversionsLeft(): number {
    if (this.getConversionLimit() === -1) {
      return -1;
    }

    return this.getConversionLimit() - this.getConversionCount();
  }
}
