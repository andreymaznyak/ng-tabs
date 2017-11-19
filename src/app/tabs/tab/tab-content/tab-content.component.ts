import { Component, OnChanges, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss']
})
export class TabContentComponent {
  @Input() tabIsActive = false;
}
