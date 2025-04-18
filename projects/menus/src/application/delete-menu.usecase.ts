import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DeleteMenuService } from '../infrastructure/services/delete-menu/delete-menu.service';
import { MenuState } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class DeleteMenuUseCase {
  private readonly _service = inject(DeleteMenuService);
  private readonly _state = inject(MenuState);
  private subscriptions: Subscription = new Subscription();

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): Observable<void> {
    return this._service.execute(id).pipe(
      tap(() => {
        const currentMenus = this._state.menus.menus.snapshot();
        const updatedMenus = currentMenus.filter((menu) => menu.id !== id);
        this._state.menus.menus.set(updatedMenus);
      })
    );
  }
}
