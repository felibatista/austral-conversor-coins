import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foreing } from 'src/app/types/foreing';

@Injectable({
  providedIn: 'root'
})

export class ForeingService {
  url = 'https://localhost:7265';

  constructor() { }

  async getForeings() {
    const get = await fetch(this.url + '/api/Foreing/all');

    const response = await get.json();

    return response;
  }
}
