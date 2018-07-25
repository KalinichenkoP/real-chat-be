import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io.js';
import {Message} from '../models/message';
import {API_URL} from '../../environments/environment';
import {Room} from '../models/room';
import {HttpClient} from '@angular/common/http';
import {ApiListResponse} from '../../../classes/ApiListResponce';
import {FormGroup} from '@angular/forms';

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

  sendMessage(messageCreateForm: FormGroup): Observable<Message> {
    return this.httpClient
      .post<Message>(`${this.url}`, messageCreateForm.value);
  }

  sendMessageReadInfo(messageUUID: string, roomId: number): Observable<Message> {
    return this.httpClient
      .request<Message>('patch',`${this.url}/read/${roomId}/${messageUUID}`);
  }
}
