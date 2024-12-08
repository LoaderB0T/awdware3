import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Signal,
  computed,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

import { RepoInfo } from '../../models/compact-repo-info.model';
import { RepoInfoService } from '../../services/repo-info.service';
import { Project } from '../projects';

@Component({
  standalone: false,
  selector: 'awd-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  private readonly _repoInfoService: RepoInfoService;
  private readonly _translateService: TranslateService;
  public readonly repoInfo = signal<RepoInfo | null>(null);
  public readonly lang: Signal<string | null>;

  @Input({ required: true }) project!: Project;

  constructor(starsService: RepoInfoService, translateService: TranslateService) {
    this._repoInfoService = starsService;
    this._translateService = translateService;
    const langChange = toSignal(this._translateService.onLangChange);
    this.lang = computed<string | null>(
      () => langChange()?.lang ?? this._translateService.currentLang
    );
  }

  public async ngOnInit() {
    if (!this.project) {
      throw new Error('ProjectComponent: project is not defined');
    }
    const repoInfo = await this._repoInfoService.getRepoInfo(
      this.project.gitHubUser,
      this.project.name
    );
    this.repoInfo.set(repoInfo);
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
