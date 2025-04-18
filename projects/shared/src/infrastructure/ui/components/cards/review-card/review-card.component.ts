import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from '../../icons/icons.component';

@Component({
  selector: 'lib-review-card',
  standalone: true,
  imports: [CommonModule, IconsComponent],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
})
export class ReviewCardComponent {
  @Input() reviewerName: string = '';
  @Input() reviewerAvatar: string = ''; // URL de la imagen del avatar
  @Input() reviewDate: string = '';
  @Input() reviewText: string = '';
  @Input() reviewRating: number = 0; // Valor entre 0 y 5
  @Input() foodImage?: string = ''; // URL de la imagen opcional de comida

  // Método para generar un array del tamaño del rating para las estrellas
  get ratingStars(): number[] {
    return Array(Math.floor(this.reviewRating)).fill(0);
  }

  // Método para generar un array con las estrellas vacías
  get emptyStars(): number[] {
    return Array(5 - Math.floor(this.reviewRating)).fill(0);
  }
}
