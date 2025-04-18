import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from '../../../../domain/model/menu.reponse.interface';
import { CardBtnComponent } from 'shared';
import { ModalComponent } from 'shared';
import { CommonModule } from '@angular/common';
import { DeleteMenuUseCase } from '../../../../application/delete-menu.usecase';

@Component({
  selector: 'lib-menu-card',
  standalone: true,
  imports: [CardBtnComponent, ModalComponent, CommonModule],
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent {
  @Input() menu: IMenu;
  showModal: boolean = false;

  constructor(
    private router: Router,
    private deleteMenuUseCase: DeleteMenuUseCase
  ) {}

  onUpdate() {
    this.router.navigate(['menus/edit', this.menu.id]);
  }

  onDelete() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
  }

  onConfirmDelete() {
    this.deleteMenuUseCase.execute(this.menu.id).subscribe(() => {
      console.log('Menú eliminado:', this.menu.id);
      this.showModal = false;
    });
  }
}
