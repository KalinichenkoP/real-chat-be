import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyDatePickerModule} from 'mydatepicker';
import {Ng2PaginationModule} from 'ng2-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {GoogleAuthComponent} from './google-auth.component';

import {ROUTES} from './google-auth.router';
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    RouterModule.forChild(ROUTES),
    NgbModule.forRoot(),
    Ng2PaginationModule
  ],
  declarations: [
    GoogleAuthComponent
  ],
  exports: [
    MatButtonModule
  ]
})
export class GoogleAuthModule {
}
