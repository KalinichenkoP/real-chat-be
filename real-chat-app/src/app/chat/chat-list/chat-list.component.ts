import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  protected rooms: Room[] = [];

  constructor(private roomService: RoomService) {
  }

  async ngOnInit() {
    this.roomService.getRoomList().subscribe(response => this.rooms = response.data);
  }

}
