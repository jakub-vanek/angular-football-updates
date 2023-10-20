import { Injectable } from '@angular/core';
import { Standing, StandingsResponse } from '../types/Standing';
import { Result, ResultsResponse } from '../types/Result';
import { SeasonService } from './season.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, EMPTY, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiFootballService {
  private apiUrl: string = 'https://v3.football.api-sports.io';
  private apiKey: string = '77f7b688d3af90d9b7b0d7b3bd7c68c0';
  private apiHeaders: HttpHeaders = new HttpHeaders({
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey,
  });

  private getLeagueId(country: string): number | undefined {
    switch (country) {
      case 'England':
        return 39; // Premier League
      case 'Spain':
        return 140; // La Liga
      case 'France':
        return 61; // Ligue 1
      case 'Germany':
        return 78; // Bundesliga
      case 'Italy':
        return 135; // Serie A
    }
    return undefined;
  }

  public getStandings(country: string): Observable<Standing[]> {
    const leagueId = this.getLeagueId(country);
    if (leagueId) {
      const season = this.seasonService.getCurrentSeason();
      console.log('getStandings', country, season, leagueId);
      return this.http
        .get<StandingsResponse>(
          `${this.apiUrl}/standings?league=${leagueId}&season=${season}`,
          { headers: this.apiHeaders },
        )
        .pipe(catchError(this.handleError))
        .pipe(
          map((s: StandingsResponse) => {
            if (s.errors) {
              console.error(s.errors);
              return [];
            } else if (
              s !== undefined &&
              s.response.length > 1 &&
              s.response[0].league.standings.length > 1
            ) {
              return s.response[0].league.standings[0];
            } else {
              return [];
            }
          }),
        );
    }
    return EMPTY;
  }

  public getResults(country: string, teamId: number): Observable<Result[]> {
    const leagueId = this.getLeagueId(country);
    if (leagueId) {
      const season = this.seasonService.getCurrentSeason();
      console.log('getStandings', country, season, teamId);
      return this.http
        .get<ResultsResponse>(
          `${this.apiUrl}/fixtures?team=${teamId}&season=${season}`, // last (????)
          { headers: this.apiHeaders },
        )
        .pipe(catchError(this.handleError))
        .pipe(
          map((s: ResultsResponse) => {
            if (s.errors) {
              console.error(s.errors);
              return [];
            } else {
              return s.response;
            }
          }),
        );
    }
    return EMPTY;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error calling Football API', error.error);
    return throwError(() => new Error('Error calling Football API'));
  }

  constructor(
    private seasonService: SeasonService,
    private http: HttpClient,
  ) {}
}
