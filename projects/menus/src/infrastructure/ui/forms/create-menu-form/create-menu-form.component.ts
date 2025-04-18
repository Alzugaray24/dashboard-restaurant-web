import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardBtnComponent } from 'shared';
import { IMenu } from '../../../../domain/model/menu.reponse.interface';
import { IDish } from 'dishes';
import { ListDishesUseCase } from 'dishes';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-create-menu-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CardBtnComponent],
  templateUrl: './create-menu-form.component.html',
  styleUrls: ['./create-menu-form.component.scss'],
})
export class CreateMenuFormComponent implements OnInit {
  menuName: string = '';
  menuDishIds: number[] = [];
  availableDishes$: Observable<IDish[]>;

  @Output() submitForm = new EventEmitter<{
    name: string;
    dishIds: number[];
  }>();

  private readonly listDishesUseCase = inject(ListDishesUseCase);

  ngOnInit(): void {
    this.availableDishes$ = this.listDishesUseCase.dishes$();
    this.listDishesUseCase.execute();
  }

  onSubmit() {
    this.submitForm.emit({ name: this.menuName, dishIds: this.menuDishIds });
  }
}
