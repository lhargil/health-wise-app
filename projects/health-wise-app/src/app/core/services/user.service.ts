import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.userSubject.asObservable();

  constructor() {}

  setUser(id: string) {
    this.userSubject.next(id);
  }

  getUser() {
    this.userSubject.getValue();
  }
}
