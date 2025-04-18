import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenu } from '../../../domain/model/menu.reponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ListMenuService {
  private apiUrl = 'http://localhost:8080/api/menu';

  constructor(private http: HttpClient) {}

  execute(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(this.apiUrl);
  }
}
