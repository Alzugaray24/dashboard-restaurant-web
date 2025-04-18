import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenu } from '../../../domain/model/menu.reponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateMenuService {
  private apiUrl = 'http://localhost:8080/api/menu';

  constructor(private http: HttpClient) {}

  execute(menu: { name: string; dishIds: number[] }): Observable<IMenu> {
    return this.http.post<IMenu>(this.apiUrl, menu);
  }
}
