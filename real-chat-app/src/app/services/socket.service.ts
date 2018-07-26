import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io.js';
import {Message} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  public initSocket(): void {
    this.socket = io('http://127.0.0.1:3000');
  }

  connectRoom(roomId: number): void {
    this.socket.emit('connectRoom', roomId);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (message: Message) => {
        observer.next(message);
      });
    });
  }

  public onMessageUpdate(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('messageUpdate', (messageUUID: string) => {
        console.log(messageUUID);
        observer.next(messageUUID);
      });
    });
  }
}
