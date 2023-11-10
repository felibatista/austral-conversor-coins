import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foreing } from 'src/app/types/foreing';

@Injectable({
  providedIn: 'root'
})

export class ForeingService {
  private url: string = 'https://localhost:7265/api/Foreing/all';

  constructor(private http: HttpClient) { }

  getForeings(): Observable<Array<Foreing>> {
    return this.http.get<Array<Foreing>>(this.url);
  }
}
