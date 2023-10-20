import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  public getCurrentSeason(): number {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0 based month index

    // This is approximate, as each league and season can start on a different day
    // If we wanted exact result, we would use the /leagues endpoint to get current season
    if (month >= 1 && month < 8) {
      return year - 1;
    } else {
      return year;
    }
  }
}
