import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CountrySelectComponent } from './country-select.component';
import { ResultsComponent } from './results.component';
import { StandingsComponent } from './standings.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  declarations: [
    AppComponent,
    CountrySelectComponent,
    ResultsComponent,
    StandingsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
