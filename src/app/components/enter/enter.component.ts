import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss'],
  animations: [
    trigger('slide', [
      state(
        '*',
        style({
          opacity: 0,
          transform: 'translateX(-200%)',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      transition(':enter', animate('400ms 300ms ease-out')),
      transition('* => visible', animate('200ms ease-out')),
      transition('visible => *', animate('400ms ease-out')),
    ]),
  ],
})
export class EnterComponent {
  show = false;

  get visibleState() {
    return this.show ? 'hidden' : 'visible';
  }

  toggleVisible() {
    this.show = !this.show;
  }

  logStart(event: any) {
    console.log('animation start', event);
  }

  logDone(event: any) {
    console.log('animation end', event);
  }
}
