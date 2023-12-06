import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-close',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-close.component.html',
  styleUrl: './edit-close.component.css'
})
export class EditCloseComponent {
  @Input() title = '-';
  @Input() description = "-";
  @Input() close(): (args: any) => void {
    throw new Error("Method not implemented.");
  }
}
