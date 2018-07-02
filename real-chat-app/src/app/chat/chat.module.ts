import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {MatButtonModule, MatCheckboxModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./chat.router";

@NgModule({
  declarations: [ChatComponent],
  imports: [
    // MatButtonModule,
    // MatCheckboxModule,
    CommonModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class ChatModule { }
