import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  createRoom(chatName: string): Observable<Room> {
    console.log(chatName);
    return this.httpClient
      .post<Room>(this.url, JSON.stringify({name: chatName}), {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  getRoomById(roomId: number): Observable<Room> {
    console.log(roomId);
    return this.httpClient
      .get<Room>(`${this.url}/${roomId}`);
  }
}
