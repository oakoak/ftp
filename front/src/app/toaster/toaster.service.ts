import { Injectable } from '@angular/core';
import { Toast } from './toast.interface';
import { ToastType } from './toast.type';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  subject: BehaviorSubject<Toast | null>;
  toast$: Observable<Toast | null>;

  constructor() {
    this.subject = new BehaviorSubject<Toast|null>(null);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== null));

    this.subject.subscribe(value => console.log(value))
  }

  show(type: ToastType, title: string, body: string, delay: number) {
    this.subject.next({ type, title, body, delay });
  }
}
