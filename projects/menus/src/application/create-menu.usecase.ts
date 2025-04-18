import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IMenu } from '../domain/model/menu.reponse.interface';
import { CreateMenuService } from '../infrastructure/services/create-menu/create-menu.service';
import { MenuState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class CreateMenuUseCase {
  private readonly _service = inject(CreateMenuService);
  private readonly _state = inject(MenuState);
  private subscriptions: Subscription = new Subscription();

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menu: { name: string; dishIds: number[] }): Observable<IMenu> {
    return this._service.execute(menu).pipe(
      tap((newMenu: IMenu) => {
        const currentMenus = this._state.menus.menus.snapshot();
        this._state.menus.menus.set([...currentMenus, newMenu]);
      })
    );
  }
}
