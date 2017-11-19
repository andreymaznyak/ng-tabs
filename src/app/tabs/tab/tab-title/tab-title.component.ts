import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.scss']
})
export class TabTitleComponent {
  @Input() tabIsActive = false;
  @Output() onHeaderClick = new EventEmitter<void>();

  titleClickHandler() {
    this.onHeaderClick.emit();
  }
}
