import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenu } from '../../../domain/model/menu.reponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuService {
  private apiUrl = 'http://localhost:8080/api/menu';

  constructor(private http: HttpClient) {}

  execute(
    id: number,
    menu: { name: string; dishIds: number[] }
  ): Observable<IMenu> {
    return this.http.put<IMenu>(`${this.apiUrl}/${id}`, menu);
  }
}
