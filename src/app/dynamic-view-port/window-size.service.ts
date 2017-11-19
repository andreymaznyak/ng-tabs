import { Injectable, HostListener } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

export declare type ViewPortType = 'small' | 'medium' | 'large';

@Injectable()
export class WindowSizeService {
  static SMALL: ViewPortType = 'small';
  static MEDIUM: ViewPortType = 'medium';
  static LARGE: ViewPortType = 'large';

  public get onResize$(): Observable<ViewPortType> {
    return this._onResize$;
  }
  private _onResize$: Observable<ViewPortType>;
  private resizeSubject: BehaviorSubject<ViewPortType>;
  private config: {
    medium: number;
    large: number;
  };

  constructor(private eventManager: EventManager) {
    this.config = environment.viewPortConfig;
    this.resizeSubject = new BehaviorSubject<ViewPortType>(this.getViewPortType((window || { innerWidth: 0 }).innerWidth));
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
    this._onResize$ = this.resizeSubject.asObservable();
  }

  public getCurrentViewPortType() {
    return this.resizeSubject.getValue();
  }

  private onResize(event: UIEvent) {
    const viewportWidth = (<Window>event.target).innerWidth;
    const currentViewPort = this.getViewPortType(viewportWidth);
    const previousViewPort = this.resizeSubject.getValue();
    if (currentViewPort !== previousViewPort) {
      this.resizeSubject.next(currentViewPort);
    }
  }

  private getViewPortType(viewportWidth: number): ViewPortType {
    if (viewportWidth < this.config.medium) {
      return WindowSizeService.SMALL;
    } else if (viewportWidth >= this.config.large) {
      return WindowSizeService.LARGE;
    } else {
      return WindowSizeService.MEDIUM;
    }
  }
}
