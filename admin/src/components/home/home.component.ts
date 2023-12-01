import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PANELS, Panel } from '../../lib/panels';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  panels: Panel[] = PANELS;
    
  constructor() {}
}
