import { Component, OnInit, Input, Output, EventEmitter, QueryList,
   OnDestroy, AfterContentInit, ContentChildren, OnChanges } from '@angular/core';
import { TabContentComponent } from './tab-content/tab-content.component';
import { TabTitleComponent } from './tab-title/tab-title.component';
@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, OnDestroy, AfterContentInit, OnChanges {
  private _isActive = false;
  @Input() set isActive(val) {
    console.log('set is active', val);
    this._isActive = val;
    this.ngOnChanges();
  }
  get isActive() {
    return this._isActive;
  }
  @Output() onActivateTab = new EventEmitter<TabComponent>();

  @ContentChildren(TabContentComponent) content: QueryList<TabContentComponent>;
  @ContentChildren(TabTitleComponent) title: QueryList<TabTitleComponent>;

  constructor() { }

  ngOnInit() {
    // register new tab
  }

  ngOnChanges() {
    console.log('on changes inputs', this.isActive);
    this.initContent();
  }

  onTitleClick() {
    console.log('this on title click', this);
    this.onActivateTab.emit(this);
  }

  ngOnDestroy() {
    // unregister tab
  }

  ngAfterContentInit() {
    this.initContent();
    this.initTitle();
  }

  initTitle() {
    this.title.first.onHeaderClick.subscribe(
      () => {
        this.onTitleClick();
      }
    );
  }

  initContent() {
    this.content.first.tabIsActive = this.isActive;
  }
}
