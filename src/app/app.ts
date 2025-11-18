import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CowService } from './features/data/cow.service';
import { take } from 'rxjs';
import { Cow } from './features/data/cow.model';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('cow-catalog-system');

  private _cowService = inject(CowService);

  constructor() {
    this._cowService
      .getCows()
      .pipe(take(1))
      .subscribe({
        next: (res: { cows: Cow[] }) => {
          this._cowService.loadCows(res.cows);
        },
      });
  }
}
