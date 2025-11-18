import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import type { TextFilterModel } from 'ag-grid-community';

import { Cow } from './cow.model';

@Injectable({ providedIn: 'root' })
export class CowStore {
  private cowsSubject = new BehaviorSubject<Cow[]>([]);
  public cows$ = this.cowsSubject.asObservable();

  private searchSubject = new BehaviorSubject<string>('');
  public search$ = this.searchSubject.asObservable();

  private filterSubject = new BehaviorSubject<any>('');
  public filter$ = this.filterSubject.asObservable();

  public setSearch(text: string) {
    this.searchSubject.next(text);
  }

  public loadCows(cows: Cow[]) {
    this.cowsSubject.next(cows);
  }

  public setFilter(status: TextFilterModel) {
    this.filterSubject.next(status);
  }

  public addCow(cow: Cow) {
    const cowList = this.cowsSubject.value;
    this.cowsSubject.next([...cowList, cow]);
  }

  public getCows() {
    return this.cowsSubject.value;
  }
}
