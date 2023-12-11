import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Currency } from '../../lib/types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversor-currencies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversor-currencies.component.html',
  styleUrl: './conversor-currencies.component.css'
})
export class ConversorCurrenciesComponent implements OnInit {
  @Input() currencies: Currency[] = [];
  @Input() actual: Currency | null = null;
  @Input() type: string = '';
  @Input() result: number = 0;
  
  @Output() resultChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() actualChange: EventEmitter<Currency> = new EventEmitter<Currency>();

  currenciesCopy: Currency[] = [];
  find = '';
  
  updateCurrency(currency: Currency): void {
    this.actual = currency;
    this.find = '';
    this.currenciesCopy = this.currencies;
    this.actualChange.emit(currency);
    this.resultChange.emit(0);

    window.document.getElementById(this.type + '-dropdown-currency')?.blur();
  }

  constructor() {}

  ngOnInit(): void {
    this.currenciesCopy = this.currencies;
  }

  changeFind(): void {
    this.currenciesCopy = this.currencies.filter((currency) => {
      return currency.code.toLowerCase().includes(this.find.toLowerCase());
    });
  }

  close(){
    this.find = '';
    this.currenciesCopy = this.currencies;
    window.document.getElementById(this.type + '-dropdown-currency')?.blur();
  }
}
