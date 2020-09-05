import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserProfileInformation } from '../../../core/models';

@Component({
  selector: 'hwa-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailComponent implements OnInit {
  @Input() userProfileInformation: UserProfileInformation;

  constructor() { }

  ngOnInit(): void {
  }

}
