import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface AwdLetContext<T> {
  awdLet: T;
  $implicit: T;
}

@Directive({ standalone: false, selector: '[awdLet]' })
export class AwdLetDirective<T> {
  public static awdLetUseIfTypeGuard: void;
  static ngTemplateGuard_awdLet: 'binding';

  private readonly _context: AwdLetContext<T | null> = { awdLet: null, $implicit: null };
  private hasView = false;
  private readonly _viewContainer: ViewContainerRef;
  private readonly _templateRef: TemplateRef<AwdLetContext<T>>;

  constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<AwdLetContext<T>>) {
    this._viewContainer = viewContainer;
    this._templateRef = templateRef;
  }

  static ngTemplateContextGuard<T>(
    _dir: AwdLetDirective<T>,
    ctx: unknown
  ): ctx is AwdLetContext<Exclude<T, false | 0 | '' | null | undefined>> {
    return true;
  }

  @Input()
  set awdLet(value: T) {
    this._context.$implicit = this._context.awdLet = value;
    if (!this.hasView) {
      this._viewContainer.createEmbeddedView(this._templateRef, this._context);
      this.hasView = true;
    }
  }
}
