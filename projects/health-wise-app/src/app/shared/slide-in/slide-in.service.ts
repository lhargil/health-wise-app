import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ModalState } from './modal-state';

export const enum SlideInState {
  Close,
  Open,
}

@Injectable({
  providedIn: 'root',
})
export class SlideInService {
  private notificationSubject = new Subject<ModalState>();
  get notification$() {
    return this.notificationSubject.asObservable();
  }
  constructor() {}

  show(data: ModalState) {
    this.notificationSubject.next({ ...data });
  }
}
