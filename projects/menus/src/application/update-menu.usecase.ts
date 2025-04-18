import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IMenu } from '../domain/model/menu.reponse.interface';
import { UpdateMenuService } from '../infrastructure/services/update-menu/update-menu.service';
import { MenuState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuUseCase {
  private readonly _service = inject(UpdateMenuService);
  private readonly _state = inject(MenuState);
  private subscriptions: Subscription = new Subscription();

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(
    id: number,
    menu: { name: string; dishIds: number[] }
  ): Observable<IMenu> {
    return this._service.execute(id, menu).pipe(
      tap((updatedMenu: IMenu) => {
        const currentMenus = this._state.menus.menus.snapshot();
        const updatedMenus = currentMenus.map((m) =>
          m.id === updatedMenu.id ? updatedMenu : m
        );
        this._state.menus.menus.set(updatedMenus);
      })
    );
  }
}
