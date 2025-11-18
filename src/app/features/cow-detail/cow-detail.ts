import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { CowStore } from '../data/cow.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cow-detail',
  imports: [ReactiveFormsModule, FormlyModule, ButtonModule, RouterLink],
  templateUrl: './cow-detail.html',
  styleUrl: './cow-detail.scss',
})
export class CowDetail {
  form = new FormGroup({});

  model = { id: '', sex: '', pen: '', status: 'Active', weight: 0 };
  fields: FormlyFieldConfig[] = [
    {
      key: 'id',
      type: 'input',
      props: {
        label: 'Ear tag',
        required: true,
      },
    },
    {
      key: 'sex',
      type: 'radio',
      props: {
        label: 'Sex',
        required: true,
        options: [
          { value: 'Male', label: 'Male' },
          { value: 'Female', label: 'Female' },
        ],
      },
    },
    {
      key: 'pen',
      type: 'input',
      props: {
        label: 'Ear pen',
        required: true,
      },
    },
    {
      key: 'status',
      type: 'select',
      props: {
        label: 'Status',
        required: true,

        options: [
          { value: 'Active', label: 'Active' },
          { value: 'In Treatment', label: 'In Treatment' },
          { value: 'Deceased', label: 'Deceased' },
        ],
      },
    },
    {
      key: 'weight',
      type: 'input',
      props: {
        type: 'number',
        min: 0,
        label: 'Ear weight',
        required: false,
      },
    },
  ];

  private _cowStore = inject(CowStore);

  onSubmit(model: any) {
    this._cowStore.addCow(model);
  }
}
