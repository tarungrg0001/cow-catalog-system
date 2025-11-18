import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CowService } from '../data/cow.service';

@Component({
  selector: 'app-cow-detail',
  imports: [ReactiveFormsModule, FormlyModule, ButtonModule, RouterLink],
  templateUrl: './cow-detail.html',
  styleUrl: './cow-detail.scss',
})
export class CowDetail implements OnInit {
  public form = new FormGroup({});
  public model = { id: '', sex: '', pen: '', status: 'Active', weight: 0 };
  public options: FormlyFormOptions = {
    formState: {
      disabled: false,
    },
  };

  public fields: FormlyFieldConfig[] = [
    {
      key: 'id',
      type: 'input',
      props: {
        label: 'Ear tag',
        required: true,
      },
      expressions: {
        'props.disabled': 'formState.disabled',
      },
      validators: {
        duplicateId: {
          expression: (c: AbstractControl) => !c.value || this._cowService.ifIdPresent(c.value),
          message: (error: any) => `This id already exists`,
        },
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
      expressions: {
        'props.disabled': 'formState.disabled',
      },
    },
    {
      key: 'pen',
      type: 'input',
      props: {
        label: 'Ear pen',
        required: true,
      },
      expressions: {
        'props.disabled': 'formState.disabled',
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
      expressions: {
        'props.disabled': 'formState.disabled',
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
      expressions: {
        'props.disabled': 'formState.disabled',
      },
    },
  ];

  public id: any;
  private _cowService = inject(CowService);
  private _activatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.options.formState.disabled = true;
      const cow = this._cowService.getCow(this.id);
      this.model = { ...cow, weight: cow.weight ? cow.weight : 0 };
    }
  }

  public onSubmit(model: any) {
    this._cowService.addCow({ ...model, lastEventDate: new Date() });
  }
}
