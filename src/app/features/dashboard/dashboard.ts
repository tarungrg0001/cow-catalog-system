import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { CowList } from '../cow-list/cow-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule, CowList, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
