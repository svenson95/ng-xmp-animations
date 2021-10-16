import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {animate, query, stagger, state, style, transition, trigger} from "@angular/animations";

import {ScrollService} from "../../services/scroll.service";

const MARGIN = '800px';

@Component({
  selector: 'app-staggers',
  templateUrl: './staggers.component.html',
  styleUrls: ['./staggers.component.scss'],
  animations: [
    trigger('stagger', [
      state('hidden', style({
        // initial
        height: '*',
        transform: `translateX(-${MARGIN})`,
      })),
      state('visible', style({
        // initial
        height: '*',
      })),
      transition('hidden => visible', [
        query('.card', stagger('150ms ease-in-out', [
          style({
            // initial
            opacity: 0,
            height: '0px',
            'padding-top': '0',
            'padding-bottom': '0',
          }),
          animate('250ms ease-in-out', style({
            // final
            opacity: 1,
            transform: `translateX(${MARGIN})`,
            height: '*',
            'padding-top': '*',
            'padding-bottom': '*',
          })),
        ]))
      ]),
      transition('visible => hidden', [
        query('.card', stagger('120ms ease-in-out', [
          style({
            // initial
            height: '*',
            'padding-top': '*',
            'padding-bottom': '*',
            opacity: 1,
          }),
          animate('250ms ease-in-out', style({
            // final
            height: '0px',
            'padding-top': '0',
            'padding-bottom': '0',
            opacity: 0,
            transform: `translateX(-${MARGIN})`
          }))
        ]))
      ])
    ]),
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

  constructor(@Inject(ScrollService) private scroll: ScrollService) {
  }

  get staggerState() {
    return this.inViewport ? 'visible' : 'hidden';
  }

  ngOnInit() {
    this.scroll.getEvent().subscribe((event) => {
      this.inViewport = this.isInViewport(this.cardsContainer.nativeElement);
    });
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
