import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AwdLetDirective } from './directives/awd-let.directive';

@NgModule({
  declarations: [AwdLetDirective],
  imports: [CommonModule, HttpClientModule, TranslateModule],
  exports: [TranslateModule, AwdLetDirective]
})
export class SharedModule {}
