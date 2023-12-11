import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversion } from '../../lib/types';

@Component({
  selector: 'app-dashboard-month',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-month.component.html',
  styleUrl: './dashboard-month.component.css'
})
export class DashboardMonthComponent implements OnInit{
  @Input() userConversions: Conversion[] = [];
  @Input() loading: boolean = true;

  thisMonthConversions: Conversion[] = [];
  lastMonthConversions: Conversion[] = [];

  constructor() {}

  ngOnInit(): void {
    this.thisMonthConversions = this.getThisMonthConversions();
    this.lastMonthConversions = this.getLastMonthConversions();
  }

  getThisMonthConversions(): Conversion[] {
    const thisMonthConversions = this.userConversions.filter((conversion) => {
      return conversion.date.getMonth() === new Date().getMonth();
    });

    return thisMonthConversions;
  }

  getLastMonthConversions(): Conversion[] {
    const lastMonthConversions = this.userConversions.filter((conversion) => {
      return conversion.date.getMonth() === new Date().getMonth() - 1;
    });

    return lastMonthConversions;
  }

  getThisMonthConversionsCount(): number {
    return this.thisMonthConversions.length;
  }

  getLastMonthConversionsCount(): number {
    return this.lastMonthConversions.length;
  }

  getDifference(): number {
    return this.getThisMonthConversionsCount() - this.getLastMonthConversionsCount();
  }
}
