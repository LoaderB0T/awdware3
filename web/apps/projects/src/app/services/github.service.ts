import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private readonly _http: HttpClient;
  constructor(http: HttpClient) {
    this._http = http;
  }

  public getStargazers(username: string, repoName: string): Promise<any> {
    return firstValueFrom(this._http.get(`https://api.github.com/repos/${username}/${repoName}/stargazers`));
  }
}
