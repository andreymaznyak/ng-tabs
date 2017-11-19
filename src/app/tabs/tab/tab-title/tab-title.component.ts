import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.scss']
})
export class TabTitleComponent implements OnInit {

  @Output() onHeaderClick = new EventEmitter<void>();

  titleClickHandler() {
    console.log('On header click');
    this.onHeaderClick.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
