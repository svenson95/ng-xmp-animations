import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-slide',
  templateUrl: './scroll-point.component.html',
  styleUrls: ['./scroll-point.component.scss'],
  animations: [
    trigger('scrollState', [
      state('*', style({
        opacity: 0,
        transform: 'translateX(-200%)'
      })),
      state('show', style({
        opacity: '*' // opacity is 1.0 by default
      })),
      state('hide',   style({
        opacity: 0.1
      })),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('200ms ease-in'))
    ])
  ]
})
export class ScrollPointComponent {

  scrolled = false;
  cards = [
    "@angular/animations is installed by default",
    "import { BrowserAnimationsModule } from '@angular/platform-browser/animations';",
    "Animation provides the illusion of motion: HTML elements change styling over time",
    "Well-designed animations can make your application more fun and straightforward to use",
    "Motion greatly enhances the user experience",
    "Angular's animation system is built on CSS functionality"
  ];

  @ViewChild('image') image!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrolled = this.isInViewport(this.image.nativeElement);
  }

  get slideState() {
    return this.scrolled ? 'show' : 'hide';
  }

  isInViewport(el: any) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top <= 500 &&
      rect.bottom >= 300
    );
  }

  toggleSlide() {
    this.scrolled = !this.scrolled;
  }

}
