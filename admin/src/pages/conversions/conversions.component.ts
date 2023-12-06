import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversion } from '../../lib/types';
import { ConversionsService } from '../../services/conversions.service';
import { TableConversionsComponent } from '../../components/table-conversions/table-conversions.component';

@Component({
  selector: 'app-conversions',
  standalone: true,
  imports: [CommonModule, TableConversionsComponent],
  templateUrl: './conversions.component.html',
  styleUrl: './conversions.component.css'
})
export class ConversionsComponent implements OnInit {
  conversions: Conversion[] = [];

  constructor(private conversionsService: ConversionsService) {}

  ngOnInit(): void {
    this.conversionsService.getConversionsPage(1).then((conversions) => {
      if (conversions) {
        this.conversions = conversions;
      }
    });
  }
}
