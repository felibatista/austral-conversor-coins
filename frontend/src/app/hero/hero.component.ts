import { Component } from '@angular/core';
import { ConversorComponent } from '../conversor/conversor.component';

@Component({
  selector: 'hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  imports: [
    ConversorComponent
  ]
})
export class HeroComponent {

}
