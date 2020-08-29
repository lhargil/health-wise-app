import { Component, OnInit } from '@angular/core';
import { AuthServiceX } from '../core/auth-service.component';

@Component({
  selector: 'hwa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authX: AuthServiceX) { }

  ngOnInit(): void {
  }
}
