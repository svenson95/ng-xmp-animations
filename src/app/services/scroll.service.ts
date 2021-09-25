import { Injectable } from '@angular/core';
import { fromEvent, Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollEvent$ = fromEvent(window, 'wheel');

  constructor() { }

  getEvent(): Observable<WheelEvent | Event> {
    return this.scrollEvent$.pipe(
      map((event) => event),
      debounceTime(50)
    );
  }
}
