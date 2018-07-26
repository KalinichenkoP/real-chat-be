import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../../environments/environment';
import {Observable} from 'rxjs';
// import {Channel} from '../models/room';
import {ApiListResponse} from '../../../classes/ApiListResponce';
import {Room} from '../models/room';
import {FormGroup} from '@angular/forms';
import {User} from '../models/user';

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

  createRoom(createForm: FormGroup): Observable<Room> {
    return this.httpClient
      .post<Room>(this.url, createForm.value);
  }

  getRoomById(roomId: number): Observable<Room> {
    return this.httpClient
      .get<Room>(`${this.url}/${roomId}`);
  }

  connectToRoom(roomId: number, userId: number): Observable<Room> {
    return this.httpClient
      .get<Room>(`${this.url}/${roomId}/${userId}`);
  }
}
