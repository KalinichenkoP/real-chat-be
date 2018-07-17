import { Injectable } from '@angular/core';
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

  constructor(private httpClient: HttpClient) { }

  sendMessage(text: string, room: string) : Observable<Message> {
    return this.httpClient
      .post<Message>(this.url, JSON.stringify({text: text, room: room}), {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  sendMessageSocket(message: Object): void {
    const socket = io('http://localhost:3001');
    socket.on('connect', function () {
      console.log('Connected');
      socket.emit('events', { test: message });
    });
    // const socket = io.connect('http://localhost:3001');
    // socket.emit('message', {message});
    // socket.on('news', (data) => {
    //     console.log(data);
    //
    // });
    // socket.disconnect();
  }

  connect(): void {
    const socket = io('http://localhost:3001');
    socket.on('connect', function () {
      console.log('Connected');
      socket.emit('events', { test: 'test' });
    });
  }
}
