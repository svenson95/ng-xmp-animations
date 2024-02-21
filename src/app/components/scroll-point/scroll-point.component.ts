import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-scroll-point',
  templateUrl: './scroll-point.component.html',
  styleUrls: ['./scroll-point.component.scss'],
  animations: [
    trigger('scrolling', [
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
          opacity: '*', // opacity is 1.0 by default
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0.1,
        })
      ),
      transition('visible => hidden', animate('500ms ease-out')),
      transition('hidden => visible', animate('200ms ease-in')),
    ]),
  ],
})
export class ScrollPointComponent implements OnInit {
  public typescript = `
    import { fromEvent, Observable } from "rxjs";
    import { debounceTime, map } from "rxjs/operators";

    scrollEvent$ = fromEvent(window, 'wheel');

    getEvent(): Observable<WheelEvent | Event> {
      return this.scrollEvent$.pipe(
        map((event) => event),
        debounceTime(50)
      );
    }
  `;

  @ViewChild('image') image!: ElementRef;
  inViewport = false;
  cards = [
    '@angular/animations is installed by default',
    "import { BrowserAnimationsModule } from '@angular/platform-browser/animations';",
    'Animation provides the illusion of motion: HTML elements change styling over time',
    'Well-designed animations can make your application more fun and straightforward to use',
    'Motion greatly enhances the user experience',
    "Angular's animation system is built on CSS functionality",
  ];

  // Angular triggers Change Detection every time
  // when DOM event happens and it has some handler 
  scrollEvent$ = fromEvent(window, 'scroll').pipe(debounceTime(30));

  constructor(@Inject(NgZone) private ngZone: NgZone) {}

  get slideState() {
    return this.inViewport ? 'visible' : 'hidden';
  }

  ngOnInit() {
    // Inside runOutsideAngular callback, events which are usually triggering CD
    // will not do it anymore, so you can improve performance with this approach
    this.ngZone.runOutsideAngular(() => {
      this.scrollEvent$.subscribe(() => {
        this.ngZone.run(() => {
          this.inViewport = this.isInViewport(this.image.nativeElement);
        });
      });
    });
  }

  isInViewport(el: HTMLElement) {
    const { top, bottom } = el.getBoundingClientRect();
    return top <= 800 && bottom >= 300;
  }

  toggleSlide() {
    this.inViewport = !this.inViewport;
  }
}
