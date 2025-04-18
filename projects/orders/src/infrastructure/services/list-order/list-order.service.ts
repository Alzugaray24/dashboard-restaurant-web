import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../../../domain/model/order.response.interface';

@Injectable({
  providedIn: 'root',
})
export class ListOrderService {
  private apiUrl = 'http://localhost:8080/api/order';

  constructor(private http: HttpClient) {}

  execute(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.apiUrl);
  }
}
