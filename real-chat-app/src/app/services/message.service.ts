import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io.js';
import {Message} from '../models/message';
import {API_URL} from '../../environments/environment';
import {Room} from '../models/room';
import {HttpClient} from '@angular/common/http';
import {ApiListResponse} from '../../../classes/ApiListResponce';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = API_URL + '/messages';
  constructor(private httpClient: HttpClient) {
  }

  getMessages(roomName: string): Observable<Message[]> {
    return this.httpClient
      .get<Message[]>(`${this.url}?roomName=${roomName}`);
  }

}
