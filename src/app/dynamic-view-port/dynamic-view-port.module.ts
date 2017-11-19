import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowSizeService } from './window-size.service';
import { IfViewportSizeDirective } from './if-viewport-size.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IfViewportSizeDirective
  ],
  exports: [
    IfViewportSizeDirective
  ],
  providers: [WindowSizeService],
})
export class DynamicViewPortModule { }
