import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-status.component.html',
  styleUrl: './card-status.component.css',
})
export class CardStatusComponent {
  @Input() service!: string;
  @Input() status!: boolean;
  @Input() loaded!: boolean;
}
