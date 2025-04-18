import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListMenusUseCase } from '../../../../application/list-menu.usecase';
import { Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menu.reponse.interface';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { MenuPageComponent } from '../../components/menu-page/menu-page.component';

@Component({
  selector: 'lib-list-container',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, MenuPageComponent, CommonModule],
  templateUrl: './list-container.component.html',
})
export class ListContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(ListMenusUseCase);
  public menus$: Observable<IMenu[]>;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.getAllMenus();
    this.menus$ = this._useCase.menus$();
  }

  getAllMenus(): void {
    console.log('getAllMenus');
    this._useCase.execute();
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
