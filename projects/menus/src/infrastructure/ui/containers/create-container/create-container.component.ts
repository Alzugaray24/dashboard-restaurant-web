import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateMenuUseCase } from '../../../../application/create-menu.usecase';
import { CreateMenuFormComponent } from '../../forms/create-menu-form/create-menu-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-create-container',
  standalone: true,
  imports: [CreateMenuFormComponent, CommonModule, FormsModule],
  templateUrl: './create-container.component.html',
  styleUrls: ['./create-container.component.scss'],
})
export class CreateContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(CreateMenuUseCase);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this._useCase.initSubscription();
  }

  onCreateMenu(menu: { name: string; dishIds: number[] }): void {
    this._useCase.execute(menu).subscribe((newMenu) => {
      console.log('Menu created:', newMenu);
      this.router.navigate(['/menus']);
    });
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
