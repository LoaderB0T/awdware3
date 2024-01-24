import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AwdLetDirective } from './directives/awd-let.directive';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [AwdLetDirective, TooltipDirective],
  imports: [CommonModule, HttpClientModule, TranslateModule],
  exports: [TranslateModule, AwdLetDirective, TooltipDirective]
})
export class SharedModule {}
