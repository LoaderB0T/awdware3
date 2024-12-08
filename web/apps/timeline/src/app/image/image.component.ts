import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  input,
  Input,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ResourceMapModule } from 'ng-dynamic-mf';

function toBoolean(value: string | boolean): boolean {
  return value !== null && `${value}` !== 'false';
}
function toNumber(value: string | number): number {
  return !isNaN(parseFloat(`${value}`)) && !isNaN(Number(`${value}`)) ? Number(`${value}`) : 0;
}

@Component({
  imports: [CommonModule, TranslateModule, ResourceMapModule],
  selector: 'awd-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  public readonly src = input.required<string>();
  public readonly alt = input.required<string>();

  /**
   * Set the image to be centered in the container
   */
  @HostBinding('class.center')
  @Input({ transform: toBoolean })
  public center: boolean = false;

  /**
   * Set the width of the image in %
   */
  @HostBinding('style.--width.%')
  @Input({ transform: toNumber })
  public width: number = 100;

  /**
   * Set the max height of the image in px
   */
  @HostBinding('style.max-height.px')
  @Input({ transform: toNumber })
  protected maxheight: number | undefined = undefined;

  protected readonly isFullscreen = signal(false);
  protected readonly isZoom = signal(false);

  protected openFullscreen() {
    this.isFullscreen.set(true);
  }
  protected toggleZoom(event: Event) {
    this.isZoom.update(f => !f);
    return event.stopPropagation();
  }
  protected closeFullscreen() {
    this.isFullscreen.set(false);
    this.isZoom.set(false);
  }
  @HostListener('document:keydown', ['$event'])
  public keypress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeFullscreen();
    }
  }
}
