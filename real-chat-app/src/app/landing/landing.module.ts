import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import {RouterModule} from "@angular/router";
import {ROUTES} from "./landing.router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations:[LandingComponent]
})
export class LandingModule { }
