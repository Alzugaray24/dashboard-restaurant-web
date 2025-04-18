import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMenu } from '../../../../domain/model/menu.reponse.interface';
import { MenuCardComponent } from '../menu-card/menu-card.component';
import { CardBtnComponent } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-menu-page',
  standalone: true,
  imports: [CommonModule, MenuCardComponent, CardBtnComponent],
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent {
  @Input() menus: IMenu[] = [];

  constructor(private router: Router) {}

  onCreateMenu() {
    this.router.navigate(['menus/create']);
  }
}
