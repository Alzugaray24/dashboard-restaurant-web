import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDish } from '../../../public-api';

@Injectable({
  providedIn: 'root',
})
export class UpdateDishService {
  private apiUrl = 'http://localhost:8080/api/dish';

  constructor(private http: HttpClient) {}

  execute(id: number, dish: Partial<IDish>): Observable<IDish> {
    return this.http.put<IDish>(`${this.apiUrl}/${id}`, dish);
  }
}
