import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ForeingService } from 'src/app/services/foreing/foreing.service';
import { Foreing } from 'src/app/types/foreing';

@Component({
  selector: 'conversor',
  standalone: true,
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css'],
  imports: [
    CommonModule
  ]
})
export class ConversorComponent {
  foreings: any[] = [];
  from: Foreing;
  to: Foreing;
  amount: number = 0;
  result: number = 0;

  constructor(private foreingService: ForeingService) {
    this.from = {
      id: 1,
      code: 'ARS',
      name: 'Pesos Argentinos',
      value: 0.33,
      imageUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/ar.svg'
    }

    this.to = {
      id: 2,
      code: 'USD',
      name: 'Dolar Estadounidense',
      value: 1,
      imageUrl: 'https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/us.svg'
    }
  }

  setFrom(foreing: Foreing): void {
    this.from = foreing;
    window.document.getElementById('fromDropdown')?.blur();
  }

  setTo(foreing: Foreing): void {
    this.to = foreing;
    window.document.getElementById('toDropdown')?.blur();
  }


  convert(): void {
    this.result = this.amount * this.to.value / this.from.value;
  }

  ngOnInit(): void {
    this.foreingService.getForeings().subscribe((data) => {
      data.forEach((foreing) => {
        this.foreings.push(foreing);
      });
    });
  }
}
