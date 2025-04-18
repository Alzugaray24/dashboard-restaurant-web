import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardBtnComponent } from 'shared';
import { IMenu } from '../../../../domain/model/menu.reponse.interface';
import { IDish } from 'dishes';
import { ListDishesUseCase } from 'dishes';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-update-menu-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CardBtnComponent],
  templateUrl: './update-menu-form.component.html',
  styleUrls: ['./update-menu-form.component.scss'],
})
export class UpdateMenuFormComponent implements OnInit {
  @Input() menu: Partial<IMenu> = { name: '', dishes: [] };
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
    const dishIds = this.menu.dishes.map((dish) => dish.id);
    console.log('Dish IDs to be sent:', dishIds);
    this.submitForm.emit({ name: this.menu.name, dishIds });
  }
}
