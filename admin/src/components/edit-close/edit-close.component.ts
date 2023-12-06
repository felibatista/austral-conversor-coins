import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-close',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-close.component.html',
  styleUrl: './edit-close.component.css',
})
export class EditCloseComponent {
  @Input() title = '-';
  @Input() description = '-';

  @Output() close = new EventEmitter<void>();

  constructor() {}

  closeEdit() {
    this.close.emit();
  }
}
