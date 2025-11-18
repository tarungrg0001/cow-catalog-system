import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cow } from './cow.model';
import { CowStore } from './cow.store';

@Injectable({ providedIn: 'root' })
export class CowService {
  private _https = inject(HttpClient);
  private _cowStore = inject(CowStore);

  public getCows(): Observable<{ cows: Cow[] }> {
    return this._https.get<{ cows: Cow[] }>('assets/cow-details.json');
  }

  public loadCows(cows: Cow[]) {
    this._cowStore.loadCows(cows);
  }

  public getCow(id: string) {
    return this._cowStore.getCows().filter((cow) => cow.id === id)[0];
  }

  public ifIdPresent(id: string) {
    return this._cowStore.getCows().findIndex((cow) => cow.id === id);
  }

  public addCow(cow: Cow) {
    this._cowStore.addCow(cow);
  }
}
