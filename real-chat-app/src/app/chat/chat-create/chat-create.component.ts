import { Component, OnInit } from '@angular/core';
import {RoomService} from '../../services/room.service';
import {NotifierService} from '../../notifier/notifier.service';
import {Room} from '../../models/room';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {required} from 'joi';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.css']
})
export class ChatCreateComponent implements OnInit {

  protected roomName: string;
  protected createRoomForm: FormGroup;
  protected rooms: Room[] = [];
  constructor(private roomService: RoomService,
              private notifyService: NotifierService) { }

  ngOnInit() {
    this.roomService.getRoomList().subscribe(response => this.rooms = response.data);
    this.createRoomForm = new FormGroup({
      'roomName': new FormControl(this.roomName, [Validators.required])})
  }

  sendChatName() {
    this.roomService.createRoom(this.createRoomForm).subscribe(
      (result)=> {
        console.log(result);
        this.notifyService.success("Room was create successful");
        this.createRoomForm.reset();
        // this.chats = result.data;
      }, (error) => {
        console.log(error);
        this.notifyService.failure(error.error.message.details[0].message);
      }
    );
  }
}
