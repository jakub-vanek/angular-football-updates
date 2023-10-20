import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFootballService } from './services/api-football.service';
import { Result } from './types/Result';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
})
export class ResultsComponent implements OnInit {
  protected results: Result[] = [];
  private country: string | undefined;
  private teamId: number | undefined;

  protected goBack(): void {
    this.router.navigate([
      '/standings',
      this.country ? { country: this.country } : {},
    ]);
  }

  public ngOnInit() {
    if (this.country && this.teamId) {
      this.apiFootballService
        .getResults(this.country, this.teamId)
        .subscribe((x) => {
          this.results = x;
        });
    }
  }

  constructor(
    private apiFootballService: ApiFootballService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.country = this.activeRoute.snapshot.params.country;
    this.teamId = this.activeRoute.snapshot.params.teamId;
  }
}
