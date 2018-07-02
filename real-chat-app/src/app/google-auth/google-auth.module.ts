import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyDatePickerModule } from "mydatepicker";
import { Ng2PaginationModule } from "ng2-pagination";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { GoogleAuthComponent } from "./google-auth.component";

import { PipeModule } from "../extra-pipes/pipes.module";

import { ROUTES } from "./google-auth.router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    RouterModule.forChild(ROUTES),
    NgbModule.forRoot(),
    PipeModule,
    Ng2PaginationModule
  ],
  declarations: [
    GoogleAuthComponent
  ]
})
export class GoogleAuthModule { }
