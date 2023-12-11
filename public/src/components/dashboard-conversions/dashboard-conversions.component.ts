import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversion } from '../../lib/types';
import { formatDateExtra } from '../../lib/util';

@Component({
  selector: 'app-dashboard-conversions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-conversions.component.html',
  styleUrl: './dashboard-conversions.component.css',
})
export class DashboardConversionsComponent implements OnInit {
  @Input() userConversions: Conversion[] = [];
  @Input() loading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.userConversions = this.userConversions.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });

    this.userConversions = this.userConversions.slice(0, 10);
  }

  formatDate(date: Date): string {
    return formatDateExtra(date);
  }
}
