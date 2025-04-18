import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UpdateMenuUseCase } from '../../../../application/update-menu.usecase';
import { UpdateMenuFormComponent } from '../../forms/update-menu-form/update-menu-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMenu } from '../../../../domain/model/menu.reponse.interface';

@Component({
  selector: 'lib-update-container',
  standalone: true,
  imports: [UpdateMenuFormComponent, CommonModule, FormsModule],
  templateUrl: './update-container.component.html',
  styleUrls: ['./update-container.component.scss'],
})
export class UpdateContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(UpdateMenuUseCase);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  menu: Partial<IMenu> = { id: 0, name: '', dishes: [] };

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.route.params.subscribe((params) => {
      this.menu.id = +params['id'];
      console.log('Menu ID from route params:', this.menu.id);
      // Aquí deberías obtener el menú por su ID desde el estado o servicio
      // Por simplicidad, se asume que el menú ya está disponible
      this.menu.name = ''; // Placeholder
      this.menu.dishes = []; // Placeholder
      console.log('Initial menu state:', this.menu);
    });
  }

  onUpdateMenu(menu: { name: string; dishIds: number[] }): void {
    console.log('Form data received:', menu);
    const updatedMenu = {
      name: menu.name,
      dishIds: menu.dishIds,
    };
    console.log('Updated menu to be sent to use case:', updatedMenu);
    this._useCase
      .execute(this.menu.id, updatedMenu)
      .subscribe((updatedMenu) => {
        console.log('Menu updated:', updatedMenu);
        this.router.navigate(['/menus']);
      });
  }

  ngOnDestroy() {
    this._useCase.destroySubscription();
  }
}
