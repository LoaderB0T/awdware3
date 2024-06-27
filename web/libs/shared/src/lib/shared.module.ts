import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AwdLetDirective } from './directives/awd-let.directive';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [AwdLetDirective, TooltipDirective],
  exports: [TranslateModule, AwdLetDirective, TooltipDirective],
  imports: [CommonModule, TranslateModule],
  providers: [provideHttpClient()],
})
export class SharedModule {}
