import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { CowDetail } from './features/cow-detail/cow-detail';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Dashboard },
  {
    path: 'add-cow',
    component: CowDetail,
  },
  { path: 'view-cow-detail/:id', component: CowDetail },
];
