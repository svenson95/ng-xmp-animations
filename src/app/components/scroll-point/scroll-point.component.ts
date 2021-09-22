import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { debounceTime, map } from "rxjs/operators";

import { ScrollService } from "../../services/scroll.service";

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
export class ScrollPointComponent implements OnInit {

  @ViewChild('image') image!: ElementRef;
  inViewport = false;
  cards = [
    "@angular/animations is installed by default",
    "import { BrowserAnimationsModule } from '@angular/platform-browser/animations';",
    "Animation provides the illusion of motion: HTML elements change styling over time",
    "Well-designed animations can make your application more fun and straightforward to use",
    "Motion greatly enhances the user experience",
    "Angular's animation system is built on CSS functionality"
  ];

  constructor(private scroll: ScrollService) { }

  ngOnInit() {
    this.scroll.keyup$
      .pipe(
        map((event) => event),
        debounceTime(50)
      )
      .subscribe((event) => {
        console.log(event);
        this.inViewport = this.isInViewport(this.image.nativeElement);
      });
  }

  get slideState() {
    return this.inViewport ? 'show' : 'hide';
  }

  isInViewport(el: any) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();

    return (
      rect.top <= 600 &&
      rect.bottom >= 300
    );
  }

  toggleSlide() {
    this.inViewport = !this.inViewport;
  }

}
