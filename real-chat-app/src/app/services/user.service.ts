import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {API_URL} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {BehaviorSubject} from 'rxjs';
import {Params} from '@angular/router';
import {ApiListResponse} from '../../../classes/ApiListResponce';
import {Room} from '../models/room';

interface UserModel {
  user: User;
  token: string;
}
interface UserFilterModel {
  count: number;
  rows: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = API_URL + '/users';  // URL to web api
  protected userSub: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {

  }
  // serFormToServer(userForm: FormGroup): Observable<User> {
  //   return this.httpClient
  //     .post<User>(`${API_URL}/singup`, userForm.value);
  // }
  // sendU
  //
  // public sendLoginFormToServer(loginForm: FormGroup): Observable<UserModel> {
  //   return this.httpClient
  //     .post<UserModel>(`${API_URL}/singin`, loginForm.value);
  // }

  public updateUser(updateForm: FormGroup): Observable<User> {
    return this.httpClient
      .put<User>(`${this.url}/me`, updateForm.value);
  }

  getMeFromServer(): Observable<User> {
    return this.httpClient
      .get<User>(`${this.url}/me`);
  }

  public getUserById(id: number): Observable<User> {
    return this.httpClient
      .get<User>(`${this.url}/${id}`);
  }

  public getUserByRoom(roomId: number): Observable<ApiListResponse<User>> {
    return this.httpClient
      .get<ApiListResponse<User>>(`${this.url}/room/${roomId}`);
  }

  public getMeUser(): Observable<User> {
    return this.userSub.asObservable();
  }

  public updateAvatar(file: File): Observable<User> {
    const formData = new FormData();
    formData.append('image', file);

    return this.httpClient
      .put<User>(`${this.url}/me/avatar`, formData);
  }

  public getUserByFilter(params: Params): Observable<UserFilterModel> {
    if (Object.keys(params).length === 0) {
      return this.httpClient
        .get<UserFilterModel>(`${this.url}`);
    } else {
      let query = '';
      Object.keys(params).forEach((param) => {
        query += `${param}=${params[param]}&`;
      });
      query = query.substring(0, query.length - 1);
      console.log(`${this.url}?${query}`);
      return this.httpClient
        .get<UserFilterModel>(`${this.url}?${query}`);
    }
  }

  public setUser(user: User): void {
    this.userSub.next(user);
  }

  public deleteUser(): void {
    this.userSub.next(null);
  }
}

