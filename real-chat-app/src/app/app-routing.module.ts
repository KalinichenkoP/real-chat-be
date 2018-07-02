import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChatComponent} from "./chat/chat/chat.component";

export const ROUTES: Routes = [
  {path: '', loadChildren: './landing/landing.module#LandingModule', pathMatch: 'full'},
  {path: 'chat', loadChildren: './chat/chat.module#ChatModule'},
  // {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
  // {path: 'messages', loadChildren: './messages/messages.module#MessagesModule'},
  // {path: 'search', loadChildren: './search/search.module#SearchModule'},
  {path: '**', redirectTo: ''}
];
