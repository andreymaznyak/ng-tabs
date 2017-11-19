import {
  EventEmitter, Component, OnDestroy, AfterContentInit, QueryList, ContentChildren, ChangeDetectorRef
} from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { TabTitleComponent } from './tab/tab-title/tab-title.component';
@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnDestroy, AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  activateTabEvent = new EventEmitter<TabComponent>();

  indexActiveTab = 0;

  subscribers = [];

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterContentInit() {
    this.initTabs();
    this.tabs.changes.subscribe(changes => {
      this.initTabs();
    });
  }

  ngOnDestroy() {
    this.subscribers.forEach(subscriber => subscriber.unsubscribe());
  }

  private initTabs() {
    this.setActiveTab(this.indexActiveTab, true);
    this.subscribers.forEach(subscriber => subscriber.unsubscribe());
    this.tabs.forEach((tab: TabComponent, index) => {
      this.setActiveTab(index, false);
      this.setActiveTab(this.indexActiveTab, true);
      this.subscribers.push(
        tab.onActivateTab.subscribe(
          () => {
            this.setActiveTab(this.indexActiveTab, false); // Делаем неактивным предыдущий активный таб
            this.setActiveTab(index, true); // Устанавливаем новый активный таб
            this.indexActiveTab = index;
            this.cdr.detectChanges();
          }
        ));
    });
  }

  private setActiveTab(index: number, isActive: boolean) {
    if (index < this.tabs.length) {
      this.tabs.toArray()[index].isActive = isActive;
    } else if (this.tabs.length > 0) {
      this.tabs.first.isActive = isActive;
    } else {
      console.warn(new Error('not found tabs'));
    }
  }
}
