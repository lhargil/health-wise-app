import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { subDays, addDays } from 'date-fns';

@Component({
  selector: 'hwa-calendar-wrapper',
  templateUrl: './calendar-wrapper.component.html',
  styleUrls: ['./calendar-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarWrapperComponent implements OnInit {
  @Input() events: CalendarEvent[];
  @Input() activeDayIsOpen: boolean;
  @Input() view: CalendarView;
  @Input() viewDate = new Date();
  @Output() dayClicked = new EventEmitter<{ date: Date, events: CalendarEvent[] }>();
  @Output() setView = new EventEmitter<{ view: CalendarView }>();
  @Output() navigateCalendar = new EventEmitter<Date>();
  @Output() eventTimesChanged = new EventEmitter<CalendarEventTimesChangedEvent>();
  @Output() eventClicked = new EventEmitter<{ action: string, event: CalendarEvent }>();
  @Output() deleteEvent = new EventEmitter<CalendarEvent>();

  constructor() { }

  ngOnInit() {
  }

  handleEvent(action: string, event: CalendarEvent) {
    this.eventClicked.emit({ action, event });
  }
}
