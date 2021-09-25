import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, query, stagger, state, style, transition, trigger } from "@angular/animations";

import { ScrollService } from "../../services/scroll.service";

const MARGIN = '700px';

@Component({
  selector: 'app-staggers',
  templateUrl: './staggers.component.html',
  styleUrls: ['./staggers.component.scss'],
  animations: [
    trigger('staggering', [
      state('visible', style({})),
      state('hidden', style({
        transform: `translateX(-${MARGIN})`
      })),
      transition('visible => hidden', [
        query('.card',
          stagger('100ms ease-in', [
            animate('250ms ease-in-out', style({ transform: `translateX(-${MARGIN})` }))
          ]))
      ]),
      transition('hidden => visible', [
        query('.card',
          stagger('120ms ease-in-out', [
            animate('220ms ease-in-out', style({ transform: `translateX(${MARGIN})` }))
          ]))
      ])
    ])
  ]
})
export class StaggersComponent implements OnInit {

  inViewport = false;
  cards = [
    "@angular/animations is installed by default",
    "Animation provides the illusion of motion: HTML elements change styling over time",
    "Well-designed animations can make your application more fun and straightforward to use",
    "Motion greatly enhances the user experience",
    "Angular's animation system is built on CSS functionality"
  ];

  @ViewChild('cardsContainer') cardsContainer!: ElementRef;

  constructor(private scroll: ScrollService) { }

  ngOnInit() {
    this.scroll.getEvent().subscribe((event) => {
      this.inViewport = this.isInViewport(this.cardsContainer.nativeElement);
    });
  }

  get staggerState() {
    return this.inViewport ? 'visible' : 'hidden';
  }

  isInViewport(el: HTMLElement) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top <= 700
    );
  }

  toggleSlide() {
    this.inViewport = !this.inViewport;
  }

}
