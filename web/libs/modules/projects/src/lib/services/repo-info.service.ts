import { inject, Injectable } from '@angular/core';

import { GitHubService } from './github.service';
import { RepoInfo } from '../models/compact-repo-info.model';

@Injectable({
  providedIn: 'root',
})
export class RepoInfoService {
  private readonly _gitHubService = inject(GitHubService);

  // GitHub API has a limit of 60 requests per hour, so we need to cache the results for an hour
  public async getRepoInfo(username: string, reponame: string): Promise<RepoInfo> {
    const repoInfo = await this._gitHubService.getRepoInfo(username, reponame);
    if (!repoInfo.owner) {
      return {
        description: '',
        language: '',
        name: reponame,
        stars: 0,
        username,
      };
    }
    return {
      description: repoInfo.description ?? '',
      language: repoInfo.language ?? '',
      name: reponame,
      stars: repoInfo.stargazers_count,
      username,
    };
  }
}
