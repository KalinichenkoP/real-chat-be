import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io.js';
import {Message} from '../models/message';
import {Room} from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  // constructor() {
  //   this.socket = io('http://localhost:3001');
  // }

  // sendMessage(text: string, room: string) : Observable<Message> {
  //   return this.httpClient
  //     .post<Message>(this.url, JSON.stringify({text: text, room: room}), {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  // }

  public initSocket(): void {
    this.socket = io('http://localhost:3001');
  }

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

  getAllRooms(): Observable<Room> {
    this.socket.emit('rooms');
    console.log('roomsGet');
    return new Observable<Room>(observer => {
      this.socket.on('rooms', (data: Room) => {
        console.log(data);
        observer.next(data)
      });
    });
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => {
        console.log(data);
        observer.next(data)
      });
    });
  }

}
