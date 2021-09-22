import { Injectable } from '@angular/core';
import { fromEvent, pipe } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  keyup$ = fromEvent(window, 'wheel')
  scrollPosition = 0;

  constructor() {}
}
