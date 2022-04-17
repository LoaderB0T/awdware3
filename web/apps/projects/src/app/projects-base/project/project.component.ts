import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../projects';
import { StarsService } from '../../services/stars.service';

@Component({
  selector: 'awd-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  private readonly _starsService: StarsService;
  public readonly stars$ = new BehaviorSubject<number>(0);

  @Input() project?: Project;

  constructor(starsService: StarsService) {
    this._starsService = starsService;
  }

  async ngOnInit() {
    if (!this.project) {
      throw new Error('ProjectComponent: project is not defined');
    }
    const stars = await this._starsService.getStars(this.project.gitHubUser, this.project.name);
    this.stars$.next(stars);
  }
}
