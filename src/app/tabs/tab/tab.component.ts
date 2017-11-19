import { Component, OnInit, Input, Output, EventEmitter, QueryList,
   OnDestroy, AfterContentInit, ContentChildren, OnChanges } from '@angular/core';
import { TabContentComponent } from './tab-content/tab-content.component';
import { TabTitleComponent } from './tab-title/tab-title.component';
@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnDestroy, AfterContentInit {
  private _isActive = false;
  @Input() set isActive(val) {
    this._isActive = val;
    this.initContent();
    this.initTitle();
  }
  get isActive() {
    return this._isActive;
  }
  @Output() onActivateTab = new EventEmitter<TabComponent>();

  @ContentChildren(TabContentComponent) content: QueryList<TabContentComponent>;
  @ContentChildren(TabTitleComponent) title: QueryList<TabTitleComponent>;

  private subscribers = [];

  ngOnDestroy() {
    this.subscribers.forEach( subscriber => subscriber.unsubscribe());
  }

  ngAfterContentInit() {
    this.title.first.onHeaderClick.subscribe(
      () => {
        this.onActivateTab.emit(this);
      }
    );
    this.initContent();
    this.initTitle();
  }

  initTitle() {
    this.title.first.tabIsActive = this.isActive;
  }

  initContent() {
    this.content.first.tabIsActive = this.isActive;
  }
}
