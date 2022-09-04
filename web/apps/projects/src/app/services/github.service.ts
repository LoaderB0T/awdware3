import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FullRepository } from '../models/github-repo-info.model';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private readonly _http: HttpClient;
  constructor(http: HttpClient) {
    this._http = http;
  }

  public getStargazers(username: string, reponame: string): Promise<any> {
    return firstValueFrom(this._http.get(`https://api.github.com/repos/${username}/${reponame}/stargazers`));
  }

  public async getRepoInfo(username: string, reponame: string): Promise<FullRepository> {
    return firstValueFrom(this._http.get<FullRepository>(`https://api.github.com/repos/${username}/${reponame}`));
  }
}
