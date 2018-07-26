import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io.js';
import {Message} from '../models/message';
import {API_URL} from '../../environments/environment';
import {Room} from '../models/room';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiListResponse} from '../../../classes/ApiListResponce';
import {FormGroup} from '@angular/forms';
import {ServerMessageDto} from '../models/dto/ServerMessageDto';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = API_URL + '/messages';
  constructor(private httpClient: HttpClient) {
  }

  getMessages(roomId: number): Observable<Message[]> {
    return this.httpClient
      .get<Message[]>(`${this.url}/${roomId}`);
  }

  sendMessage(message: ServerMessageDto): Observable<Message> {
    return this.httpClient
      .post<Message>(`${this.url}`, JSON.stringify(message), {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  sendMessageReadInfo(messageUUID: string, roomId: string): Observable<any> {
    const body = {
      "roomId": roomId,
      "messageUUID": messageUUID
    };
    console.log(JSON.stringify(body));
    return this.httpClient
      .post(`${this.url}/read`,JSON.stringify(body), {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
