import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-data.component.html',
  styleUrl: './dashboard-data.component.css'
})
export class DashboardDataComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() value: string | number = '';
  @Input() message?: string = '';
  @Input() loading: boolean = true;
}
