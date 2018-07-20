import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io.js';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Message} from '../models/message';
import {API_URL} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = API_URL + '/messages';
  private socket = io('http://localhost:3001');
  constructor() {
    console.log('serviceConstructor');
    this.socket.on('rooms', (data) => {
      console.log(data);
    });
    this.socket.on('message', (data) => {
      console.log(data);
    });
  }

  // sendMessage(text: string, room: string) : Observable<Message> {
  //   return this.httpClient
  //     .post<Message>(this.url, JSON.stringify({text: text, room: room}), {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  // }

  sendMessageSocket(message: Message): void {
    // const socket = io('http://localhost:3001');
    // socket.on('connect', function () {
    //   console.log('Connected');
    this.socket.emit('message', message);
    // });
  }

  createRoom(name: string): void {
    this.socket.emit('createRoom', name);
  }

  connectRoom(name: string): void {
    this.socket.emit('connectRoom', name);
  }

  getAllRooms(): void {
    this.socket.emit('rooms');
    console.log('roomsGet');
  }

}
