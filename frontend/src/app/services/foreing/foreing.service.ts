import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForeingService {
  private url: string = 'https://localhost:7265/api/Foreing/all';

  constructor(private http: HttpClient) { }

  getForeings() {
    return this.http.get(this.url);
  }
}
