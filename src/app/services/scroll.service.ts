import { Injectable } from '@angular/core';
import { fromEvent, Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollEvent$: Observable<WheelEvent | Event>;

  constructor() {
    this.scrollEvent$ = fromEvent(window, 'wheel').pipe(
      map((event) => event),
      debounceTime(50)
    );
  }
}
