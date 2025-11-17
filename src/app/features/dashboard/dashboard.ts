import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { CowList } from '../cow-list/cow-list';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule, CowList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
