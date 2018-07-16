import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
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
}
