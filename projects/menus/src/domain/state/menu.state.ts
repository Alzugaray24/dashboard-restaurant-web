import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { IMenu } from '../model/menu.reponse.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenusState {
  private readonly _factory = inject(StateFactory);
  private readonly menus$ = new BehaviorSubject<IMenu[]>([]);

  store() {
    return {
      menus: this._factory.state(this.menus$),
    };
  }
}
