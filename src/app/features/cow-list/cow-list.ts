import { Component, inject, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { Cow } from '../data/cow.model';
import { CowService } from '../data/cow.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-cow-list',
  imports: [AgGridAngular],
  templateUrl: './cow-list.html',
  styleUrl: './cow-list.scss',
})
export class CowList implements OnInit {
  public cows!: Cow[];
  public colDefs!: ColDef[];

  private myGridApi!: GridApi;
  private _cowService = inject(CowService);

  public ngOnInit(): void {
    this.defineColumns();
    this._cowService.getCows().subscribe((cows: { cows: Cow[] }) => {
      this.cows = cows.cows;
    });
  }

  private defineColumns() {
    this.colDefs = [
      { field: 'id' },
      { field: 'sex' },
      { field: 'pen' },
      { field: 'status' },
      {
        field: 'lastEventDate',
        resizable: false,
        valueFormatter: (params) => {
          return new Date(params.data.lastEventDate).toDateString();
        },
      },
    ];
  }

  public onGridReay(event: GridReadyEvent): void {
    this.myGridApi = event.api;
    this.myGridApi.sizeColumnsToFit();
  }
}
