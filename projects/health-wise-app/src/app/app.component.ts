import { Component } from '@angular/core';

@Component({
  selector: 'hwa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'health-wise-app';
  show: boolean = false;
  open = false;
  toggle() {
    this.show = !this.show;
    setTimeout(() => {
      this.open = !this.open;
    }, 100);
  }
  hide() {
    this.open = false;
    setTimeout(() => {
      this.show = false;
    }, 500);
  }
}
