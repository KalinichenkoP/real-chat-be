import {RouterModule, Routes} from '@angular/router';

export const ROUTES: Routes = [
  {path: 'landing', loadChildren: './landing/landing.module#LandingModule'},
  {path: 'chat', loadChildren: './chat/chat.module#ChatModule'},
  {path: '**', redirectTo: 'landing', pathMatch: 'full'},
];
