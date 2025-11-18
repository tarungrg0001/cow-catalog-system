import { Component, inject, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent, TextFilterModel } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { InputTextModule } from 'primeng/inputtext';

import { Cow } from '../data/cow.model';
import { CowStore } from '../data/cow.store';
import { ActionRenderer } from '../../shared/action-renderer/action-renderer';

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
  public searchedCow: string = '';

  private myGridApi!: GridApi;
  private _cowStore = inject(CowStore);

  public ngOnInit(): void {
    this.defineColumns();
    this._cowStore.cows$.subscribe((cows: Cow[]) => {
      this.cows = cows;
    });
  }

  private defineColumns() {
    this.colDefs = [
      { field: 'id', cellRenderer: ActionRenderer },
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
      this.searchedCow = search;
      this.applyQuickFilter(search);
    });

    this._cowStore.filter$.subscribe((filter: TextFilterModel) => {
      this.applyColumnFilter(filter);
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
