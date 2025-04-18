import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../../../domain/model/customer.response.interface';

@Injectable({
  providedIn: 'root',
})
export class UpdateCustomerService {
  private apiUrl = 'http://localhost:8080/api/customer';

  constructor(private http: HttpClient) {}

  execute(id: number, customer: ICustomer): Observable<ICustomer> {
    console.log('servicio', id, customer);

    return this.http.put<ICustomer>(`${this.apiUrl}/${id}`, customer);
  }
}
