import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Channel} from '../models/channel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = API_URL + '/channels';

  constructor(private httpClient: HttpClient) { }

  getChatList(): Observable<Channel[]> {
    return this.httpClient
      .get<Channel[]>(this.url);
  }
}
