import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BloodPressureFormComponent } from './blood-pressure-form.component';
import { FormGroup } from '@angular/forms';
import { IFormShell } from '../../../core/interfaces';
import { BloodPressureReading } from '../../../core/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'hwa-blood-pressure-form-shell',
  templateUrl: './blood-pressure-form-shell.component.html',
  styleUrls: ['./blood-pressure-form-shell.component.scss'],
})
export class BloodPressureFormShellComponent
  implements OnInit, IFormShell<BloodPressureReading> {
  private formGroup: FormGroup;

  @ViewChild(BloodPressureFormComponent, { static: true })
  bloodPressureFormComponent: BloodPressureFormComponent;

  @Input()
  formData: BloodPressureReading;
  formIsValid$: Observable<boolean>;

  constructor() { }

  formSubmit(callback: (data: BloodPressureReading) => void) {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }

    callback(this.formGroup.value);
  }

  ngOnInit(): void {
    this.formGroup = this.bloodPressureFormComponent.createGroup(this.formData);
    this.formIsValid$ = this.formGroup.statusChanges.pipe(
      map((status: string) => status.toLowerCase() == 'valid')
    );
  }
}
