import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() maxRating: number = 5;
  @Input() readonly: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showValue: boolean = false;
  @Input() precision: 'half' | 'full' | 'exact' = 'half';
  @Input() color: string = '';
  @Input() inactiveColor: string = '';

  @Output() ratingChange = new EventEmitter<number>();

  hoveredRating: number | null = null;

  // Array to iterate over in the template
  get stars(): number[] {
    return Array(this.maxRating)
      .fill(0)
      .map((_, i) => i + 1);
  }

  // Get the CSS classes for a specific star
  getStarClasses(starPosition: number): string[] {
    const classes: string[] = ['star-rating__star'];

    // Add size class
    classes.push(`star-rating__star--${this.size}`);

    // Add filled/partial/empty class based on current star position
    const displayRating =
      this.hoveredRating !== null ? this.hoveredRating : this.rating;

    if (this.precision === 'exact') {
      // For exact precision, calculate fill percentage
      if (displayRating >= starPosition) {
        classes.push('star-rating__star--full');
      } else if (displayRating > starPosition - 1) {
        classes.push('star-rating__star--partial');
        // Set custom property for partial fill
        this.calculatePartialFill(displayRating, starPosition);
      } else {
        classes.push('star-rating__star--empty');
      }
    } else if (this.precision === 'half') {
      // For half-star precision
      if (displayRating >= starPosition) {
        classes.push('star-rating__star--full');
      } else if (displayRating >= starPosition - 0.5) {
        classes.push('star-rating__star--half');
      } else {
        classes.push('star-rating__star--empty');
      }
    } else {
      // For full-star precision
      if (displayRating >= starPosition) {
        classes.push('star-rating__star--full');
      } else {
        classes.push('star-rating__star--empty');
      }
    }

    return classes;
  }

  // Calculate the percentage fill for partial stars
  calculatePartialFill(rating: number, position: number): number {
    if (rating > position - 1 && rating < position) {
      const percentage = (rating - (position - 1)) * 100;
      return percentage;
    }
    return 0;
  }

  // Handle star hover (preview rating)
  hoverStar(rating: number): void {
    if (this.readonly) return;
    this.hoveredRating = rating;
  }

  // Reset hover state when mouse leaves the component
  resetHover(): void {
    this.hoveredRating = null;
  }

  // Handle star click (set rating)
  rateStar(rating: number): void {
    if (this.readonly) return;
    this.rating = rating;
    this.ratingChange.emit(rating);
  }

  // Handle partial star clicks based on click position
  handlePartialClick(event: MouseEvent, position: number): void {
    if (this.readonly || this.precision === 'full') {
      this.rateStar(position);
      return;
    }

    const starElement = event.currentTarget as HTMLElement;
    const rect = starElement.getBoundingClientRect();
    const starWidth = rect.width;
    const clickXPosition = event.clientX - rect.left;

    // For half-star precision
    if (this.precision === 'half') {
      const halfStarWidth = starWidth / 2;
      if (clickXPosition < halfStarWidth) {
        this.rateStar(position - 0.5);
      } else {
        this.rateStar(position);
      }
    }
    // For exact precision
    else if (this.precision === 'exact') {
      const percentage = clickXPosition / starWidth;
      const exactRating = position - 1 + percentage;
      // Round to 1 decimal place
      const roundedRating = Math.round(exactRating * 10) / 10;
      this.rateStar(roundedRating);
    }
  }

  // Format the displayed rating value
  formatRating(rating: number): string {
    switch (this.precision) {
      case 'exact':
        return rating.toFixed(1);
      case 'half':
        return rating.toFixed(1);
      default:
        return rating.toString();
    }
  }
}
