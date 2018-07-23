import {Routes} from '@angular/router';

export const ROUTES: Routes = [
  {path: 'chat', loadChildren: './chat/chat.module#ChatModule'},
  {path: 'google-auth', loadChildren: './google-auth/google-auth.module#GoogleAuthModule'},
  {path: '**', redirectTo: 'chat', pathMatch: 'full'},
];
