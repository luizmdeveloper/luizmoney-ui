import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="hasError()"
        class="ui-message  ui-messages-error">
        {{message}}
    </div>
  `,
  styles: [`
    .ui-messages-error{
      margin : 0;
      margin-top : 4px;
    }
  `]
})
export class MessageComponent {

  @Input() control: FormControl;
  @Input() message: string;
  @Input() error: string;

  hasError() {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
