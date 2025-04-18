import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDish } from '../../../domain/model/dish.response.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateDishService {
  private apiUrl = 'http://localhost:8080/api/dish';

  constructor(private http: HttpClient) {}

  execute(dish: Partial<IDish>): Observable<IDish> {
    return this.http.post<IDish>(this.apiUrl, dish);
  }
}
