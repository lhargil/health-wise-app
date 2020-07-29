import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BloodPressureReading } from '../../../core/models';
import { FormGroupConfig } from '../../../core/interfaces';

@Component({
  selector: 'hwa-blood-pressure-form',
  templateUrl: './blood-pressure-form.component.html',
  styleUrls: ['./blood-pressure-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BloodPressureFormComponent implements OnInit {
  bloodPressureForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  createGroup(bloodPressureReading: BloodPressureReading) {
    const config: FormGroupConfig<BloodPressureReading> = {
      id: [bloodPressureReading.id],
      systole: [bloodPressureReading.systole, [Validators.required]],
      diastole: [bloodPressureReading.diastole, [Validators.required]],
      heartRate: [bloodPressureReading.heartRate, [Validators.required]],
      personId: [bloodPressureReading.personId],
      dateAdded: [bloodPressureReading.dateAdded],
    };

    this.bloodPressureForm = this.fb.group(config);

    return this.bloodPressureForm;
  }
}
