import { Component } from '@angular/core';
import { ForeingService } from 'src/app/services/foreing/foreing.service';

@Component({
  selector: 'conversor',
  standalone: true,
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css'],
})
export class ConversorComponent {
  constructor(private foreingService: ForeingService) {}

  ngOnInit(): void {
    this.foreingService.getForeings().subscribe((quotes) => console.log(quotes));
  }
}
