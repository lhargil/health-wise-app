import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  parse,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { SlideInService } from '../../../shared/slide-in/slide-in.service';
import { BloodPressureFormShellComponent } from '../blood-pressure-form/blood-pressure-form-shell.component';
import { BloodPressureReading } from '../../../core/models';
import { ModalModes } from '../../../shared/slide-in/modal-state';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'hwa-bp-calendar',
  templateUrl: './bp-calendar.component.html',
  styleUrls: ['./bp-calendar.component.scss'],
})
export class BpCalendarComponent implements OnInit {
  // @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: 'Edit event',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: 'Delete event',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(private slideInService: SlideInService) {}

  ngOnInit() {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;

      if (events.length === 0) {
        this.slideInService.show({
          heading: 'Add new blood pressure reading',
          formData: {
            systole: 130,
            diastole: 80,
            heartRate: 80,
            dateAdded: date.toLocaleDateString(),
          },
          modalMode: ModalModes.Create,
          component: BloodPressureFormShellComponent,
          handleSave: this.handleSave(),
        });
      } else {
        console.log('Edit reading');
      }
    }
  }
  handleSave(): (eventData: any) => void {
    return (updatedBloodPressureReading: BloodPressureReading) => {
      this.addEvent({
        title: `Systole: ${updatedBloodPressureReading.systole}. Diastole: ${updatedBloodPressureReading.diastole}. Heart rate: ${updatedBloodPressureReading.heartRate}`,
        start: startOfDay(
          parse(updatedBloodPressureReading.dateAdded, 'M/dd/yyyy', new Date())
        ),
        end: endOfDay(
          parse(updatedBloodPressureReading.dateAdded, 'M/dd/yyyy', new Date())
        ),
        color: colors.red,
      });
    };
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
    /*
    this.addEvent({
        title: 'New event',
        start: startOfDay(date),
        end: endOfDay(date),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      });
    */
  }

  addEvent(eventToAdd: any): void {
    this.events = [...this.events, eventToAdd];
    console.log(this.events);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
