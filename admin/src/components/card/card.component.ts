import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent{
  @Input() id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() icon!: string;
  @Input() link!: string;

  send(){
    window.document.location.href = this.link
  }
}
