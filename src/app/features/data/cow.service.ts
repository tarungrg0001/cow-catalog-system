import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cow } from './cow.model';

@Injectable({ providedIn: 'root' })
export class CowService {
  private _https = inject(HttpClient);

  public getCows(): Observable<{ cows: Cow[] }> {
    return this._https.get<{ cows: Cow[] }>('assets/cow-details.json');
  }
}
