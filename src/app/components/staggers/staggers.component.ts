import {Component, ElementRef, ViewChild,} from '@angular/core';
import {animate, keyframes, query, stagger, style, transition, trigger,} from '@angular/animations';

const LOREMIPSUM = [
  '@angular/animations is installed by default',
  'Animation provides the illusion of motion: HTML elements change styling over time',
  'Well-designed animations can make your application more fun and straightforward to use',
  'Motion greatly enhances the user experience',
  "Angular's animation system is built on CSS functionality",
]

@Component({
  selector: 'app-staggers',
  templateUrl: './staggers.component.html',
  styleUrls: ['./staggers.component.scss'],
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger('200ms', [
          animate('400ms ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(-75px)', offset: 0}),
            style({opacity: .5, transform: 'translateX(35px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateX(0)', offset: 1}),
          ]))
        ]), {optional: true}),

        query(':leave', stagger('100ms', [
          animate('300ms ease-in', keyframes([
            style({opacity: 1, transform: 'translateX(0)', offset: 0}),
            style({opacity: .5, transform: 'translateX(35px)', offset: 0.3}),
            style({opacity: 0, transform: 'translateX(-75px)', offset: 1}),
          ]))
        ]), {optional: true}),
      ])
    ]),
  ],
})
export class StaggersComponent {
  @ViewChild('cardsContainer') public cardsContainer!: ElementRef;
  public array: string[] = [];
  public showStagger: boolean = false;

  public toggleSlide(): void {
    if (this.showStagger) {
      this.array = [];
    } else {
      this.array = LOREMIPSUM;
    }
    this.showStagger = !this.showStagger;
  }
}
