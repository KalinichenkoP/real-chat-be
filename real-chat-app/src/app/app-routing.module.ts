import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const appRoutes: Routes = [
  {path: '', loadChildren: './landing/landing.module#LandingModule', pathMatch: 'full'},
  {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
  {path: 'messages', loadChildren: './messages/messages.module#MessagesModule'},
  {path: 'search', loadChildren: './search/search.module#SearchModule'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
