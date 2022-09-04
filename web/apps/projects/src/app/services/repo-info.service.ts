import { Injectable } from '@angular/core';
import { RepoInfo } from '../models/compact-repo-info.model';
import { InfoStorage } from '../models/info-storage.model';
import { GitHubService } from './github.service';

@Injectable({
  providedIn: 'root'
})
export class RepoInfoService {
  private readonly _gitHubService: GitHubService;

  constructor(gitHubService: GitHubService) {
    this._gitHubService = gitHubService;

    this._gitHubService.getRepoInfo('LoaderB0T', 'ng-dynamic-mf').then(r => console.log(r));
  }

  private getSavedRepos(): InfoStorage {
    const existingRepoInfoValue = localStorage.getItem('repoinfo');
    return existingRepoInfoValue ? JSON.parse(existingRepoInfoValue) : {};
  }

  private setSavedRepos(stars: InfoStorage) {
    localStorage.setItem('repoinfo', JSON.stringify(stars));
  }

  // GitHub API has a limit of 60 requests per hour, so we need to cache the results for an hour
  public async getRepoInfo(username: string, reponame: string): Promise<RepoInfo> {
    let existingRepos = this.getSavedRepos();
    const repoKey = `${username}/${reponame}`;
    const repoInfos = existingRepos[repoKey];
    if (repoInfos && Date.now() - repoInfos.timeStamp < 1000 * 60 * 60) {
      return repoInfos;
    } else {
      const repoInfo = await this._gitHubService.getRepoInfo(username, reponame);
      // After async operation, update the star info
      existingRepos = this.getSavedRepos();
      existingRepos[repoKey] = {
        stars: repoInfo.stargazers_count,
        name: repoInfo.name,
        username: repoInfo.owner.login,
        description: repoInfo.description ?? '',
        language: repoInfo.language ?? '',
        timeStamp: Date.now()
      };
      this.setSavedRepos(existingRepos);
      return existingRepos[repoKey];
    }
  }
}
