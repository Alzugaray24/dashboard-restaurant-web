import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IMenu } from '../domain/model/menu.reponse.interface';
import { ListMenuService } from '../infrastructure/services/list-menu/list-menu.service';
import { MenuState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class ListMenusUseCase {
  private readonly _service = inject(ListMenuService);
  private readonly _state = inject(MenuState);
  private subscriptions: Subscription = new Subscription();

  menus$(): Observable<IMenu[]> {
    return this._state.menus.menus.$();
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(
          tap((menus: IMenu[]) => {
            this._state.menus.menus.set(menus);
          })
        )
        .subscribe()
    );
  }
}
