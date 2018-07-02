import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './signin.router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [SigninComponent]
})
export class SigninModule { }
