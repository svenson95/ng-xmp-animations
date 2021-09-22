import { Injectable } from '@angular/core';
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollEvent$ = fromEvent(window, 'wheel').pipe(
    map((event) => event),
    debounceTime(80)
  );
}
