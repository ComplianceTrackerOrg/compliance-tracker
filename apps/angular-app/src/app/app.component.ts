import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CardComponent } from '~shared/components/ui/card/card.component';
import { ButtonComponent } from '~shared/components/ui/button/button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardComponent, ButtonComponent],
  host: {
    class: 'text-foreground block antialiased',
  },
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-app';
}
