import { Team } from './Team';

export interface Standing {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
  };
}

export interface StandingsResponse {
  errors: {
    [type: string]: string;
  };
  response: [
    {
      league: {
        id: number;
        standings: [Standing[]];
      };
    },
  ];
}
