import { Component, inject, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent, TextFilterModel } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { InputTextModule } from 'primeng/inputtext';

import { Cow } from '../data/cow.model';
import { CowService } from '../data/cow.service';
import { CowStore } from '../data/cow.store';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-cow-list',
  imports: [AgGridAngular, InputTextModule],
  templateUrl: './cow-list.html',
  styleUrl: './cow-list.scss',
})
export class CowList implements OnInit {
  public cows!: Cow[];
  public colDefs!: ColDef[];

  private myGridApi!: GridApi;
  private _cowService = inject(CowService);
  private _cowStore = inject(CowStore);

  public ngOnInit(): void {
    this.defineColumns();
    this._cowService.getCows().subscribe((cows: { cows: Cow[] }) => {
      this.cows = cows.cows;
    });
  }

  private defineColumns() {
    this.colDefs = [
      { field: 'id' },
      { field: 'sex', filter: true },
      { field: 'pen', filter: true },
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

  public onGridReady(event: GridReadyEvent): void {
    this.myGridApi = event.api;
    this.myGridApi.sizeColumnsToFit();
    this._cowStore.search$.subscribe((search: string) => {
      if (search) {
        this.applyQuickFilter(search);
      }
    });

    this._cowStore.filter$.subscribe((filter: TextFilterModel) => {
      if (filter) {
        this.applyColumnFilter(filter);
      }
    });
  }

  public searchValue(value: string) {
    this._cowStore.setSearch(value);
  }

  public onFilterChanged() {
    this._cowStore.setFilter(this.myGridApi.getFilterModel());
  }

  private applyQuickFilter(value: string) {
    if (this.myGridApi) {
      this.myGridApi.setGridOption('quickFilterText', value);
    }
  }

  private applyColumnFilter(filter: TextFilterModel) {
    if (this.myGridApi) {
      this.myGridApi.setFilterModel(filter);
    }
  }
}
