import { Component, OnChanges, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss']
})
export class TabContentComponent {
  private _tabIsActive = false;
  @Input() set tabIsActive(val) {
    console.log('TAB content tab is active', val, this);
    this._tabIsActive = val;
    this.cdr.detectChanges();
  }
  get tabIsActive() {
    return this._tabIsActive;
  }

  id = Math.random().toString(36).substr(2);
  constructor(private cdr: ChangeDetectorRef) { }

}
