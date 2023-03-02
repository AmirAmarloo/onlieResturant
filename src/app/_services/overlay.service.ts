import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor() { }

  private subject = new Subject<any>();
  data: any;
  sendClickEvent() {
    this.subject.next(this.data);
  }
  getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }

}
