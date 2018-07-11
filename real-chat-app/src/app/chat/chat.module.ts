import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {MatButtonModule, MatCheckboxModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./chat.router";
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatCreateComponent } from './chat-create/chat-create.component';

@NgModule({
  declarations: [ChatComponent, ChatListComponent, ChatCreateComponent],
  imports: [
    // MatButtonModule,
    // MatCheckboxModule,
    CommonModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class ChatModule { }
