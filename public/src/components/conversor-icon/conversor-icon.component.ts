import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conversor-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversor-icon.component.html',
  styleUrl: './conversor-icon.component.css'
})
export class ConversorIconComponent {
  @Input() fill: string = '';
}
