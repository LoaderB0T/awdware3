import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  type OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  standalone: false,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy {
  public shown: boolean = false;
  private readonly _renderer: Renderer2;
  private readonly _el: ElementRef<HTMLElement>;
  private _tooltip: HTMLSpanElement;

  @Input('tooltip') tooltipTitle: string = '';

  constructor(el: ElementRef, renderer: Renderer2) {
    this._el = el;
    this._renderer = renderer;
    this._tooltip = this._renderer.createElement('span');
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.shown) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hide();
  }

  public ngOnDestroy(): void {
    this.hide();
  }

  private show() {
    const padding = 20;

    this.shown = true;

    this._tooltip = this._renderer.createElement('span');
    this._tooltip.classList.add('tooltip');

    this._tooltip.innerText = this.tooltipTitle;
    setTimeout(() => {
      this._tooltip.classList.add('visible');
    }, 1);
    this._renderer.appendChild(document.body, this._tooltip);

    const hostPos = this._el.nativeElement.getBoundingClientRect();

    const tooltipPos = this._tooltip.getBoundingClientRect();

    const scrollPos =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top = hostPos.top - tooltipPos.height - 10;

    if (top < 0) {
      top = hostPos.bottom + 10;
    }

    let left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    const tooRight = this._tooltip.clientWidth + padding + left - document.body.clientWidth;
    if (tooRight > 0) {
      left -= tooRight;
    }

    if (left < padding) {
      left = padding;
    }

    this._renderer.setStyle(this._tooltip, 'top', `${top + scrollPos}px`);
    this._renderer.setStyle(this._tooltip, 'left', `${left}px`);
  }

  private hide() {
    if (!this.shown) {
      return;
    }

    const toRemove = this._tooltip;
    this._renderer.removeClass(toRemove, 'visible');
    this.shown = false;
    setTimeout(() => {
      this._renderer.removeChild(document.body, toRemove);
    }, 500);
  }
}
