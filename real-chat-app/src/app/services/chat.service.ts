import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Channel} from '../models/channel';
import {ApiListResponse} from '../../../classes/ApiListResponce';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // private url = API_URL + '/channels';

  // constructor(private httpClient: HttpClient) { }

  // getChatList(): Observable<ApiListResponse<Channel>> {
  //   return this.httpClient
  //     .get<ApiListResponse<Channel>>(this.url);
  // }
  //
  // createChat(chatName: string): Observable<Channel> {
  //   console.log(chatName);
  //   return this.httpClient
  //     .post<Channel>(this.url, JSON.stringify({name: chatName}), {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  // }
}
