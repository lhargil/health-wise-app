import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { startOfDay, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { SlideInService } from '../../../shared/slide-in/slide-in.service';
import { ModalModes } from '../../../shared/slide-in/modal-state';
import { BloodPressureFormShellComponent } from '../blood-pressure-form/blood-pressure-form-shell.component';
import { BloodPressureReading } from '../../../core/models';
import { BloodPressureReadingsService } from '../../../core/services/blood-pressure-readings.service';
import { map, tap } from 'rxjs/operators';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

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
  viewDate = new Date();
  view: CalendarView = CalendarView.Month;
  activeDayIsOpen = false;

  private addReadingSubject = new BehaviorSubject<BloodPressureReading | undefined>(undefined);
  private clickedReadingSubject = new BehaviorSubject<string | number | undefined>(undefined);
  private editReadingSubject = new BehaviorSubject<BloodPressureReading | undefined>(undefined);
  private deleteReadingSubject = new BehaviorSubject<string | number | undefined>(undefined);
  private readingToEdit: BloodPressureReading;
  clickedReading$ = this.clickedReadingSubject.asObservable();
  addReading$ = this.addReadingSubject.asObservable();
  editReading$ = this.editReadingSubject.asObservable();
  deleteReading$ = this.deleteReadingSubject.asObservable();

  readings$ = combineLatest(
    [
      this.addReading$,
      this.clickedReading$,
      this.editReading$,
      this.deleteReading$,
      this.bloodPressureService.getReadings()
    ]
  ).pipe(
    tap(([_, clickedReadingId, __, ___, readings]) => {
      if (clickedReadingId) {
        const toEdit = readings.find((reading: BloodPressureReading) => reading.id == clickedReadingId);
        if (!toEdit) {
          return;
        }
        this.readingToEdit = { ...toEdit };
      }
    }),
    tap(([_, __, editedReading, ___, readings]) => {
      if (!editedReading) {
        return;
      }
      const indexOfEdited = readings.findIndex((reading: BloodPressureReading) => reading.id == editedReading.id);
      if (indexOfEdited == -1) {
        return;
      }
      readings.splice(indexOfEdited, 1, editedReading);
    }),
    tap(([_, __, ___, deleteId, readings]) => {
      const indexOfDeleted = readings.findIndex((reading: BloodPressureReading) => reading.id == deleteId);

      if (indexOfDeleted == -1) {
        return;
      }

      readings.splice(indexOfDeleted, 1);
    }),
    map(([updatedReading, _, __, ___, readings]) => {
      if (updatedReading) {
        readings.push(updatedReading);
      }
      return readings.map((reading: BloodPressureReading) => {
        return {
          id: reading.id,
          title: `Systole: ${reading.systole} | Diastole: ${reading.diastole} | Heart rate: ${reading.heartRate}`,
          start: startOfDay(
            parseISO(reading.dateAdded)
          ),
          allDay: true,
          color: colors.red,
        } as CalendarEvent;
      });
    }),
  );

  constructor(private slideInService: SlideInService, private bloodPressureService: BloodPressureReadingsService) { }
  ngOnInit() { }

  deleteEvent() {
    // this.events = this.events.filter((event) => event !== eventToDelete);
  }

  addEvent(): void {
    // this.events = [...this.events, eventToAdd];
  }

  handleEvent(): void {
    // this.modalData = { event, action };
  }

  eventTimesChanged({
    event,
  }: CalendarEventTimesChangedEvent): void {
    // this.events = this.events.map((iEvent) => {
    //   if (iEvent === event) {
    //     return {
    //       ...event,
    //       start: newStart,
    //       end: newEnd,
    //     };
    //   }
    //   return iEvent;
    // });
    this.handleEvent();
  }

  onCalendarNagivated(date: Date) {
    this.viewDate = date;
    this.activeDayIsOpen = false;
  }

  eventClicked({ event }: { event: CalendarEvent }) {
    this.clickedReadingSubject.next(event.id);
    this.slideInService.show({
      heading: 'Edit blood pressure reading',
      formData: { ...this.readingToEdit },
      modalMode: ModalModes.Update,
      component: BloodPressureFormShellComponent,
      handleSave: this.handleSave(),
      handleDelete: this.handleDelete()
    });
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
            id: '',
            systole: 130,
            diastole: 80,
            heartRate: 80,
            dateAdded: date.toISOString(),
          },
          modalMode: ModalModes.Create,
          component: BloodPressureFormShellComponent,
          handleSave: this.handleSave(),
        });
      }
    }
  }

  handleDelete(): (eventData: any) => void {
    return (bloodPressureReading: BloodPressureReading) => {
      if (!bloodPressureReading) {
        return;
      }
      this.bloodPressureService.deleteReading(bloodPressureReading.id)
        .subscribe(_ => {
          this.deleteReadingSubject.next(bloodPressureReading.id);
          this.activeDayIsOpen = false;
        });
    };
  }

  handleSave(): (eventData: any) => void {
    return (updatedBloodPressureReading: BloodPressureReading) => {
      if (!updatedBloodPressureReading.id) {
        updatedBloodPressureReading.id = uuidv4();
        this.bloodPressureService.addReading(updatedBloodPressureReading)
          .subscribe(_ => this.addReadingSubject.next(updatedBloodPressureReading));
      } else {
        this.bloodPressureService.editReading(updatedBloodPressureReading.id, updatedBloodPressureReading)
          .subscribe(_ => this.editReadingSubject.next(updatedBloodPressureReading));
      }
    };
  }
}
