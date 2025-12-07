import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, of } from 'rxjs';

import { FullRepository } from '../models/github-repo-info.model';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private readonly _http = inject(HttpClient);

  public async getRepoInfo(username: string, reponame: string): Promise<FullRepository> {
    return firstValueFrom(
      this._http.get<FullRepository>(`/api/github/${username}/${reponame}`).pipe(
        catchError(err => {
          console.error(err);
          return of({} as FullRepository);
        })
      )
    );
  }
}
