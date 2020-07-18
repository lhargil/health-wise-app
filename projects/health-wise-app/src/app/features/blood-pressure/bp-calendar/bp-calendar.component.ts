import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { startOfDay, subDays, endOfMonth, addDays, isSameMonth, isSameDay, parse, endOfDay } from 'date-fns';
import { SlideInService } from '../../../shared/slide-in/slide-in.service';
import { ModalModes } from '../../../shared/slide-in/modal-state';
import { BloodPressureFormShellComponent } from '../blood-pressure-form/blood-pressure-form-shell.component';
import { BloodPressureReading } from '../../../core/models';

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
  events: CalendarEvent[] = [
    {
      id: '',
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.blue,
    },
    {
      id: '',
      start: subDays(endOfMonth(new Date()), 1),
      title: 'A long event that spans 2 months',
      color: colors.blue,
    },
  ];
  viewDate = new Date();
  view: CalendarView = CalendarView.Month;
  activeDayIsOpen = false;
  constructor(private slideInService: SlideInService) { }
  ngOnInit() { }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  addEvent(eventToAdd: any): void {
    this.events = [...this.events, eventToAdd];
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
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

  onCalendarNagivated(date: Date) {
    this.viewDate = date;
    this.activeDayIsOpen = false;
  }

  onDayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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
            id: 'person123',
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
        id: updatedBloodPressureReading.id,
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
}
