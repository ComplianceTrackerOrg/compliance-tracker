import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideMail } from '@ng-icons/lucide';

import { ButtonVariants, HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective, IconSize } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'spartan-button',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconDirective, NgIcon],
  // TODO: create separate list of icons
  providers: [provideIcons({ lucideMail })],
  template: `
    <button hlmBtn
      [variant]="variant"
      [disabled]="disabled"
      [class.w-full]="fullWidth"
    >
      <span *ngIf="icon" class="mr-2 h-4 inline-flex w-4">
        <ng-icon hlm class="test" [name]="icon" [size]="iconSize" color="currentColor" strokeWidth="2" />
      </span> 
      <!-- label -->
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: ButtonVariants['variant'] = 'default'
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() icon?: string; // Optional icon
  @Input() iconSize: IconSize = 'base';
}
