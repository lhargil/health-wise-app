import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  formatISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { SlideInService } from '../../../shared/slide-in/slide-in.service';
import { ModalModes } from '../../../shared/slide-in/modal-state';
import { BloodPressureFormShellComponent } from '../blood-pressure-form/blood-pressure-form-shell.component';
import { BloodPressureReading } from '../../../core/models';
import { map, tap, filter, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HealthService } from '../../../core/services/health.service';
import { HealthStore } from '../../../core/state';
import { ActivatedRoute } from '@angular/router';

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

  private clickedReading$ = new Subject();

  private editReading$ = this.clickedReading$.pipe(
    switchMap((id: string) => {
      return this.healthService.getBloodPressureReading(id);
    }),
    tap((reading: BloodPressureReading) =>
      this.slideInService.show({
        heading: 'Edit blood pressure reading',
        formData: { ...reading },
        modalMode: ModalModes.Update,
        component: BloodPressureFormShellComponent,
        handleSave: this.handleSave(),
        handleDelete: this.handleDelete(),
      })
    )
  );

  public bloodPressureReadings$ = this.healthService.stateChanged.pipe(
    filter((state: any) => !!state),
    map((state: HealthStore) => {
      return state.bloodPressureReadings.map(
        (reading: BloodPressureReading) => {
          return {
            id: reading.id,
            title: `Systole: ${reading.systole} | Diastole: ${reading.diastole} | Heart rate: ${reading.heartRate}`,
            start: utcToZonedTime(
              new Date(reading.dateTaken),
              Intl.DateTimeFormat().resolvedOptions().timeZone
            ),
            allDay: true,
            color: colors.red,
          } as CalendarEvent;
        }
      );
    })
  );

  constructor(
    private slideInService: SlideInService,
    private healthService: HealthService  ) {}

  ngOnInit() {
    this.healthService.getBloodPressureReadings().subscribe();
    this.editReading$.subscribe();
  }

  onCalendarNagivated(date: Date) {
    this.viewDate = date;
    this.activeDayIsOpen = false;
  }

  eventClicked({ event }: { event: CalendarEvent }) {
    this.clickedReading$.next(event.id);
  }

  onDayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent[];
  }): void {
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
          formData: this.getDefaultReading(this.viewDate),
          modalMode: ModalModes.Create,
          component: BloodPressureFormShellComponent,
          handleSave: this.handleSave(),
        });
      }
    }
  }

  private getDefaultReading(date: Date): BloodPressureReading {
    return {
      id: '',
      systole: 140,
      diastole: 80,
      heartRate: 80,
      dateTaken: date.toString(),
    } as BloodPressureReading;
  }

  handleDelete(): (eventData: any, afterDelete?: () => void) => void {
    return (
      bloodPressureReading: BloodPressureReading,
      afterDelete?: () => void
    ) => {
      if (!bloodPressureReading) {
        return;
      }
      this.healthService
        .deleteBloodPressureReading(bloodPressureReading)
        .pipe(
          tap((_) => {
            this.activeDayIsOpen = false;
            if (afterDelete) {
              afterDelete();
            }
          })
        )
        .subscribe();
    };
  }

  handleSave(): (eventData: any, afterSave?: () => void) => void {
    return (
      updatedBloodPressureReading: BloodPressureReading,
      afterSave?: () => void
    ) => {
    updatedBloodPressureReading.dateTaken = formatISO(
          new Date(updatedBloodPressureReading.dateTaken),
          {
            representation: 'complete',
          }
        );
    if (!updatedBloodPressureReading.id) {
        this.healthService
          .addBloodPressureReading(updatedBloodPressureReading)
          .pipe(
            tap((_) => {
              this.activeDayIsOpen = false;
              if (afterSave) {
                afterSave();
              }
            })
          )
          .subscribe();
      } else {
        this.healthService
          .updateBloodPressureReading(updatedBloodPressureReading)
          .pipe(
            tap((_) => {
              this.activeDayIsOpen = false;
              if (afterSave) {
                afterSave();
              }
            })
          )
          .subscribe();
      }
    };
  }
}
