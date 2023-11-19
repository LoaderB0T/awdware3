import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ResourceMapModule } from 'ng-dynamic-mf';

function toBoolean(value: string | boolean): boolean {
  return value !== null && `${value}` !== 'false';
}
function toNumber(value: string | number): number {
  return !isNaN(parseFloat(`${value}`)) && !isNaN(Number(`${value}`)) ? Number(`${value}`) : 0;
}

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, ResourceMapModule],
  selector: 'awd-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input({ required: true }) src!: string;
  @Input({ required: true }) alt!: string;

  @HostBinding('class.center')
  @Input({ transform: toBoolean })
  center: boolean = false;

  @HostBinding('style.--width.%')
  @Input({ transform: toNumber })
  width: number = 100;

  public readonly isFullscreen = signal(false);
  public readonly isZoom = signal(false);

  public openFullscreen() {
    this.isFullscreen.set(true);
  }
  public toggleZoom(event: Event) {
    this.isZoom.update(f => !f);
    return event.stopPropagation();
  }
  public closeFullscreen() {
    this.isFullscreen.set(false);
    this.isZoom.set(false);
  }
}
