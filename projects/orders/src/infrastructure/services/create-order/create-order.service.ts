import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../../../domain/model/order.response.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderService {
  private apiUrl = 'http://localhost:8080/api/order';

  constructor(private http: HttpClient) {}

  execute(order: {
    customerId: number;
    dishIds: number[];
  }): Observable<IOrder> {
    return this.http.post<IOrder>(this.apiUrl, order);
  }
}
