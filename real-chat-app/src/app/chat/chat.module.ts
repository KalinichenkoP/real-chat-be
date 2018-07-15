import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from "@angular/router";
import {ROUTES} from "./chat.router";
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatCreateComponent } from './chat-create/chat-create.component';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ChatComponent, ChatListComponent, ChatCreateComponent],
  imports: [
    MatListModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: [
    MatListModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class ChatModule { }
