import { Injectable } from '@angular/core';
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollEvent$ = fromEvent(window, 'scroll').pipe(debounceTime(30));
  // Event "wheel" works only if user uses mouse wheel to scroll
  // but user can scroll by pressing "space" or drag scrollbar by mouse
  // End in this case scrolling won't be fired
}
