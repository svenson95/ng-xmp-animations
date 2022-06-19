import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { EnterComponent } from './components/enter/enter.component';
import { ScrollPointComponent } from './components/scroll-point/scroll-point.component';
import { StaggersComponent } from './components/staggers/staggers.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    EnterComponent,
    ScrollPointComponent,
    StaggersComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
