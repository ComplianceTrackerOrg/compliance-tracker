import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spartan-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <!-- TODO: modify to accept like ReactNode type -->
      <p class="text-gray-500">{{ content }}</p>

      <div *ngIf="footer" class="mt-4 text-sm text-gray-600">
        {{ footer }}
      </div>
    </div>
  `
})

export class CardComponent {
  @Input() title: string = 'Card Title';
  @Input() content: string = 'This is the card content.';
  @Input() footer?: string; // Optional footer
}
