import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../projects';
import { StarsService } from '../../services/stars.service';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionManager } from '@awdware/shared';

@Component({
  selector: 'awd-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit, OnDestroy {
  private readonly _starsService: StarsService;
  private readonly _translateService: TranslateService;
  public readonly stars$ = new BehaviorSubject<number>(0);
  public readonly lang$: BehaviorSubject<string | null>;
  private readonly _subMgr = new SubscriptionManager();

  @Input() project?: Project;

  constructor(starsService: StarsService, translateService: TranslateService) {
    this._starsService = starsService;
    this._translateService = translateService;
    this.lang$ = new BehaviorSubject<string | null>(this._translateService.currentLang);
    const sub = this._translateService.onLangChange.subscribe(({ lang }) => this.lang$.next(lang));
    this._subMgr.add(sub);
  }

  public async ngOnInit() {
    if (!this.project) {
      throw new Error('ProjectComponent: project is not defined');
    }
    const stars = await this._starsService.getStars(this.project.gitHubUser, this.project.name);
    this.stars$.next(stars);
  }

  public ngOnDestroy(): void {
    this._subMgr.unsubscribeAll();
  }
}
