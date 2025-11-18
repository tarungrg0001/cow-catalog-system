import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import type { TextFilterModel } from 'ag-grid-community';

import { Cow } from './cow.model';
import { CowService } from './cow.service';

@Injectable({ providedIn: 'root' })
export class CowStore {
  private cowsSubject = new BehaviorSubject<Cow[]>([]);
  public cows$ = this.cowsSubject.asObservable();

  private searchSubject = new BehaviorSubject<string>('');
  public search$ = this.searchSubject.asObservable();

  private filterSubject = new BehaviorSubject<any>('');
  public filter$ = this.filterSubject.asObservable();

  private _cowService = inject(CowService);

  constructor() {
    this._cowService
      .getCows()
      .pipe(take(1))
      .subscribe({
        next: (res: { cows: Cow[] }) => {
          if (this.cowsSubject.value.length === 0) {
            this.cowsSubject.next(res.cows);
          }
        },
      });
  }

  public setSearch(text: string) {
    this.searchSubject.next(text);
  }

  public setFilter(status: TextFilterModel) {
    this.filterSubject.next(status);
  }

  public addCow(cow: Cow) {
    const cowList = this.cowsSubject.value;
    this.cowsSubject.next([...cowList, cow]);
  }
}
