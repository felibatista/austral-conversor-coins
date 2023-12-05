import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusService } from '../../services/status.service';
import { CardStatusComponent } from '../../components/card-status/card-status.component';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, CardStatusComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css',
})
export class StatusComponent implements OnInit {
  api: boolean = false;
  database: boolean = false;
  public: boolean = false;
  admin: boolean = false;

  loaded: boolean = false;

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.statusService
      .getStatus()
      .then((status) => {
        this.api = status.api;
        this.database = status.database;
        this.public = status.public;
        this.admin = status.admin;
      })
      .finally(() => {
        console.log('Status loaded', this.api, this.database, this.public, this.admin)
        this.loaded = true;
      });


  }
}
