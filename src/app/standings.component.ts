import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFootballService } from './services/api-football.service';
import { Standing } from './types/Standing';

@Component({
  selector: 'standings',
  templateUrl: './standings.component.html',
})
export class StandingsComponent {
  protected country: string | undefined;
  protected standings: Standing[] = [];

  protected setCountry(country: string): void {
    this.country = country;
    this.apiFootballService.getStandings(country).subscribe((x) => {
      this.standings = x;
    });
  }

  protected openResults(teamId: number): void {
    this.router.navigate([
      '/results',
      { country: this.country, teamId: teamId },
    ]);
  }

  constructor(
    private apiFootballService: ApiFootballService,
    private router: Router,
  ) {}
}
