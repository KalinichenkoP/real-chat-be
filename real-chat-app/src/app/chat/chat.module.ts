import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from "@angular/router";
import {ROUTES} from "./chat.router";
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatCreateComponent } from './chat-create/chat-create.component';

@NgModule({
  declarations: [ChatComponent, ChatListComponent, ChatCreateComponent],
  imports: [
    MatListModule,
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: [
    MatListModule
  ]
})
export class ChatModule { }
