import { Injectable } from '@angular/core';
import { StarState } from '../models/star.type';
import { GitHubService } from './github.service';

@Injectable({
  providedIn: 'root'
})
export class StarsService {
  private readonly _gitHubService: GitHubService;

  constructor(gitHubService: GitHubService) {
    this._gitHubService = gitHubService;
  }

  private getSavedStars(): StarState {
    const existingStarsValue = localStorage.getItem('stars');
    return existingStarsValue ? JSON.parse(existingStarsValue) : {};
  }

  private setSavedStars(stars: StarState) {
    localStorage.setItem('stars', JSON.stringify(stars));
  }

  // GitHub API has a limit of 60 requests per hour, so we need to cache the results for an hour
  public async getStars(username: string, reponame: string): Promise<number> {
    let existingStars = this.getSavedStars();
    const starsKey = `${username}/${reponame}`;
    const starInfo = existingStars[starsKey];
    if (starInfo && Date.now() - starInfo.timeStamp < 1000 * 60 * 60) {
      return existingStars[starsKey].amout;
    } else {
      const stars = await this._gitHubService.getStargazers(username, reponame);
      // After async operation, update the star info
      existingStars = this.getSavedStars();
      existingStars[starsKey] = {
        amout: stars.length,
        timeStamp: Date.now()
      };
      this.setSavedStars(existingStars);
      return stars.length;
    }
  }
}
