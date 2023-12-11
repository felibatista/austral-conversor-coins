import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Currency } from '../../lib/types';

@Component({
  selector: 'app-conversor-currencies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversor-currencies.component.html',
  styleUrl: './conversor-currencies.component.css'
})
export class ConversorCurrenciesComponent {
  @Input() currencies: Currency[] = [];
  @Input() actual: Currency | null = null;
  @Input() type: string = '';
  @Input() result: number = 0;
  
  @Output() resultChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() actualChange: EventEmitter<Currency> = new EventEmitter<Currency>();
  
  updateCurrency(currency: Currency): void {
    this.actual = currency;
    this.actualChange.emit(currency);
    this.resultChange.emit(0);

    window.document.getElementById(this.type + '-dropdown-currency')?.blur();
  }

  constructor() {}
}
