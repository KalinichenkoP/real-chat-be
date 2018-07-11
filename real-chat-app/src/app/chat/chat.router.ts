import {Routes} from "@angular/router";
import {ChatComponent} from "./chat/chat.component";
import {ChatListComponent} from './chat-list/chat-list.component';
import {ChatCreateComponent} from './chat-create/chat-create.component';

export const ROUTES: Routes = [
  {path: '', component: ChatComponent},
  {path: 'list', component: ChatListComponent},
  {path: 'create', component: ChatCreateComponent},
  {path: ':name', component: ChatComponent}
];
