import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from '../../lib/types';

@Component({
  selector: 'app-dashboard-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-plan.component.html',
  styleUrl: './dashboard-plan.component.css'
})
export class DashboardPlanComponent {
  @Input() userSubscription: Subscription = {} as Subscription;
}
