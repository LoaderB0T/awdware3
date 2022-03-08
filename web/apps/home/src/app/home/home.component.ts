import { Component, OnInit } from '@angular/core';
import { Typing } from './typing';

@Component({
  selector: 'awd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public readonly typing = new Typing();

  public ngOnInit(): void {
    this.typing.start('DEVELOPER DEVELOPER DEVELOPER');
  }
}
