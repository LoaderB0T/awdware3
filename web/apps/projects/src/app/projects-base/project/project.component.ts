import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../projects';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionManager } from '@awdware/shared';
import { RepoInfoService } from '../../services/repo-info.service';
import { RepoInfo } from '../../models/compact-repo-info.model';

@Component({
  selector: 'awd-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit, OnDestroy {
  private readonly _repoInfoService: RepoInfoService;
  private readonly _translateService: TranslateService;
  public readonly repoInfo$ = new BehaviorSubject<RepoInfo | null>(null);
  public readonly lang$: BehaviorSubject<string | null>;
  private readonly _subMgr = new SubscriptionManager();

  @Input() project?: Project;

  constructor(starsService: RepoInfoService, translateService: TranslateService) {
    this._repoInfoService = starsService;
    this._translateService = translateService;
    this.lang$ = new BehaviorSubject<string | null>(this._translateService.currentLang);
    const sub = this._translateService.onLangChange.subscribe(({ lang }) => this.lang$.next(lang));
    this._subMgr.add(sub);
  }

  public async ngOnInit() {
    if (!this.project) {
      throw new Error('ProjectComponent: project is not defined');
    }
    const repoInfo = await this._repoInfoService.getRepoInfo(this.project.gitHubUser, this.project.name);
    this.repoInfo$.next(repoInfo);
  }

  public ngOnDestroy(): void {
    this._subMgr.unsubscribeAll();
  }

  // https://devicon.dev/
  public toLanguageIcon(language: string): string {
    if (!language) {
      return '';
    }
    switch (language.toLowerCase()) {
      case 'c++':
        return 'cplusplus-plain';
      case 'typescript':
        return 'typescript-original';
      default:
        return '';
    }
  }
}
