import {Routes} from '@angular/router';

export const ROUTES: Routes = [
  {path: 'landing', loadChildren: './landing/landing.module#LandingModule'},
  {path: 'chat', loadChildren: './chat/chat.module#ChatModule'},
  {path: 'google-auth', loadChildren: './google-auth/google-auth.module#GoogleAuthModule'},
  {path: '**', redirectTo: 'landing', pathMatch: 'full'},
];
