import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TabsModule } from './tabs/tabs.module';
import { DynamicViewPortModule } from './dynamic-view-port/dynamic-view-port.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TabsModule,
    DynamicViewPortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
