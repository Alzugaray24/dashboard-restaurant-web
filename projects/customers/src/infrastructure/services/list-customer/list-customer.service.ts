import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../../../domain/model/customer.response.interface';

@Injectable({
  providedIn: 'root',
})
export class ListCustomerService {
  private apiUrl = 'http://localhost:8080/api/customer';

  constructor(private http: HttpClient) {}

  execute(): Observable<ICustomer[]> {
    const response = this.http.get<ICustomer[]>(this.apiUrl);
    console.log('response', response);
    return response;
  }
}
