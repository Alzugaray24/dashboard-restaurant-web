import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDish } from '../../../domain/model/dish.response.interface';

@Injectable({
  providedIn: 'root',
})
export class ListDishService {
  private apiUrl = 'http://localhost:8080/api/dish';

  constructor(private http: HttpClient) {}

  execute(): Observable<IDish[]> {
    return this.http.get<IDish[]>(this.apiUrl);
  }
}
