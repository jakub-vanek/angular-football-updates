import { Team } from './Team';

export interface Result {
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number;
    away: number;
  };
}

export interface ResultsResponse {
  errors: {
    [type: string]: string;
  };
  response: Result[];
}
