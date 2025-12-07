
import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  type OnDestroy,
  Renderer2,
  DOCUMENT
} from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy {
  public shown: boolean = false;
  private readonly _renderer = inject(Renderer2);
  private readonly _el = inject(ElementRef<HTMLElement>);
  private _tooltip?: HTMLSpanElement;
  private readonly _window = inject(DOCUMENT).defaultView;

  @Input('tooltip') tooltipTitle: string = '';

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

    const tooltip = this._renderer.createElement('span');
    this._tooltip = tooltip;

    tooltip.classList.add('tooltip');

    tooltip.innerText = this.tooltipTitle;
    setTimeout(() => {
      tooltip.classList.add('visible');
    }, 1);
    this._renderer.appendChild(document.body, tooltip);

    const hostPos = this._el.nativeElement.getBoundingClientRect();

    const tooltipPos = tooltip.getBoundingClientRect();

    const scrollPos =
      this._window?.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top = hostPos.top - tooltipPos.height - 10;

    if (top < 0) {
      top = hostPos.bottom + 10;
    }

    let left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    const tooRight = tooltip.clientWidth + padding + left - document.body.clientWidth;
    if (tooRight > 0) {
      left -= tooRight;
    }

    if (left < padding) {
      left = padding;
    }

    this._renderer.setStyle(tooltip, 'top', `${top + scrollPos}px`);
    this._renderer.setStyle(tooltip, 'left', `${left}px`);
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
