import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

interface ActionCellRendererParams extends ICellRendererParams {
  page: string;
}

@Component({
  selector: 'action-renderer',
  template: `<p-button [routerLink]="['view-cow-detail', value]" [label]="value" link /> `,
  imports: [RouterLink, ButtonModule],
})
export class ActionRenderer implements ICellRendererAngularComp {
  public value!: string;

  public agInit(params: ActionCellRendererParams): void {
    this.value = params.data.id;
  }

  public refresh(params: ActionCellRendererParams): boolean {
    return true;
  }
}
