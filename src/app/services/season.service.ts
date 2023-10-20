import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  public getCurrentSeason(): number {
    return new Date().getFullYear();
  }
}
