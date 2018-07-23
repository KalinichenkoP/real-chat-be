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

  public initSocket(): void {
    this.socket = io('http://localhost:3001');
  }

  sendMessage(message: Message): void {
    this.socket.emit('message', message);
    // });
  }

  // createRoom(name: string): void {
  //   this.socket.emit('createRoom', name);
  // }

  connectRoom(roomId: number): void {
    this.socket.emit('connectRoom', roomId.toString());
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => {
        observer.next(data)
      });
    });
  }
}
