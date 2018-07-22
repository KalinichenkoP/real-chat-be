import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../environments/environment';
import {Observable} from 'rxjs';
// import {Channel} from '../models/room';
import {ApiListResponse} from '../../../classes/ApiListResponce';
import {Room} from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private url = API_URL + '/rooms';

  constructor(private httpClient: HttpClient) { }

  getRoomList(): Observable<ApiListResponse<Room>> {
    return this.httpClient
      .get<ApiListResponse<Room>>(this.url);
  }
  //
  // createChat(chatName: string): Observable<Channel> {
  //   console.log(chatName);
  //   return this.httpClient
  //     .post<Channel>(this.url, JSON.stringify({name: chatName}), {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  // }
}
