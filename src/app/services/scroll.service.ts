import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  scrollEvent$ = fromEvent(window, 'scroll').pipe(debounceTime(30));
}
