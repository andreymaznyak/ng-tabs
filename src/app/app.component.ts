import { Component, ChangeDetectorRef, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  visible = false;
  tabs = [{
    title: `
      Dynamic 1
    `,
    content: `
      <p> Dynamic tab content 1 </p>
      <img src="http://lorempixel.com/600/400/cats/">
    `
  }];
  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  toggle() {
    this.visible = !this.visible;
    this.cdr.detectChanges();
  }

  addTab() {
    const index = this.tabs.length + 1;
    this.tabs.push({
      title: `
        Dynamic ${index}
      `,
      content: `
      <p> Dynamic tab content ${index} </p>
      <img src="http://lorempixel.com/600/400/">
      `
    });
    this.cdr.detectChanges();
  }
  removeTab() {
    this.tabs.pop();
    this.cdr.detectChanges();
  }
}
