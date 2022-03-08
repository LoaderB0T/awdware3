import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateModule],
  exports: [TranslateModule]
})
export class SharedModule {}
