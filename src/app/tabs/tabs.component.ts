import {
  EventEmitter, Component, OnInit, AfterContentInit, QueryList, ContentChildren, ChangeDetectorRef
} from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { TabTitleComponent } from './tab/tab-title/tab-title.component';
@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  activateTabEvent = new EventEmitter<TabComponent>();

  indexActiveTab = 0;
  constructor( private cdr: ChangeDetectorRef ) {}
  ngOnInit() {}

  ngAfterContentInit() {
    console.log('tabs', this.tabs);
    this.initTabs();
    this.tabs.changes.subscribe( changes => {
      console.log('tabs changes', changes);
      this.initTabs();
    });
    // this.attachTitles();
  }

  initTabs() {
    this.setActiveTab(this.indexActiveTab, true);
    this.tabs.forEach( (tab: TabComponent, index) => {
      console.log('init tab', tab, 'index', index);
      tab.onActivateTab.subscribe(
        () => {
          this.setActiveTab(this.indexActiveTab, false); // Делаем неактивным предыдущий активный таб
          this.setActiveTab(index, true); // Устанавливаем новый активный таб
          this.indexActiveTab = index;
          this.cdr.detectChanges();
          console.log('activate tab index', index);
        }
      );
    });
  }

  setActiveTab( index: number, isActive: boolean ) {
    console.log('set Active tab', index, isActive);
    if ( this.tabs.length < index ) {
      this.tabs[index].isActive = isActive;
    } else if ( this.tabs.length > 0 ) {
      this.tabs.first.isActive = isActive;
    } else {
      console.warn(new Error('not found tabs'));
    }
  }
}
