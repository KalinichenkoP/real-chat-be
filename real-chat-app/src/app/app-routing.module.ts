import {RouterModule, Routes} from '@angular/router';

export const ROUTES: Routes = [
  {path: 'landing', loadChildren: './landing/landing.module#LandingModule'},
  {path: 'chat', loadChildren: './chat/chat.module#ChatModule'},
  {path: 'signin', loadChildren: './signin/signin.module#SigninModule'},
  {path: '**', redirectTo: 'landing', pathMatch: 'full'},
];
