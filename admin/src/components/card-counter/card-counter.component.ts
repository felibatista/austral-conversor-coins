import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-counter.component.html',
  styleUrl: './card-counter.component.css'
})
export class CardCounterComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() counter!: number;
  @Input() loaded!: boolean;
}
