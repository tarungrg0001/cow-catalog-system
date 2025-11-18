import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { TextFilterModel } from 'ag-grid-community';

@Injectable({ providedIn: 'root' })
export class CowStore {
  private searchSubject = new BehaviorSubject<string>('');
  public search$ = this.searchSubject.asObservable();

  private filterSubject = new BehaviorSubject<any>('');
  public filter$ = this.filterSubject.asObservable();

  public setSearch(text: string) {
    this.searchSubject.next(text);
  }

  public setFilter(status: TextFilterModel) {
    this.filterSubject.next(status);
  }
}
