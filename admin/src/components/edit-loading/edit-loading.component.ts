import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-loading.component.html',
  styleUrl: './edit-loading.component.css'
})
export class EditLoadingComponent {
  @Input() title = 'Cargando...';
}
