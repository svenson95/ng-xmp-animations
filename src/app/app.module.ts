import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';

import { EnterComponent } from "./components/enter/enter.component";
import { ScrollPointComponent } from './components/scroll-point/scroll-point.component';
import { StaggersComponent } from './components/staggers/staggers.component';
import { ScrollService } from "./services/scroll.service";

@NgModule({
  declarations: [AppComponent, EnterComponent, ScrollPointComponent, StaggersComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [ScrollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
