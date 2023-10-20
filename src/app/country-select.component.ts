import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'country-select',
  templateUrl: './country-select.component.html',
})
export class CountrySelectComponent implements OnInit {
  protected countries: string[] = [
    'England',
    'Spain',
    'Germany',
    'France',
    'Italy',
  ];
  protected selectedCountry: string | undefined;
  @Output() selectedCountryEvent = new EventEmitter<string>();

  public selectCountry(country: string): void {
    this.selectedCountry = country;
    this.selectedCountryEvent.emit(country);
    this.router.navigate([{ country: country }]);
  }

  public ngOnInit() {
    if (this.activeRoute.snapshot.params.country) {
      this.selectCountry(this.activeRoute.snapshot.params.country);
    }
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {}
}
