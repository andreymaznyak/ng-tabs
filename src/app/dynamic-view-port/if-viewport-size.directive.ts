import { Directive, HostListener, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { WindowSizeService, ViewPortType } from './window-size.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective implements OnInit, OnDestroy {
  @Input() ifViewportSize: ViewPortType;

  changeViewPortSubscriber: Subscription;

  constructor(
    private windowSizeService: WindowSizeService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.changeViewPortSubscriber = windowSizeService.onResize$.subscribe(
      (currentViewPortType: ViewPortType) => this.renderContent(this.ifViewportSize === currentViewPortType)
    );
  }
  ngOnInit() {
    this.renderContent(this.windowSizeService.getCurrentViewPortType() === this.ifViewportSize);
  }
  ngOnDestroy() {
    this.changeViewPortSubscriber.unsubscribe();
  }
  renderContent(isShow: boolean) {
    if (isShow) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
