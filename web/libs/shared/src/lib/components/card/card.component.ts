import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'awd-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
