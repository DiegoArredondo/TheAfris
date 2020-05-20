import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static createEventUrl = "postEvent"
  static updateEventUrl = "updateEvent"
  static deleteEventUrl = "deleteEvent"
  static createPostUrl = "postPost"
  static updatePostUrl = "updatePost"
  static deletePostUrl = "deletePost"
  static getUserById = "getUser"
  static getEventById = "getEvent"
  static getPostById = "getPost"

  static getAllEvents = "getAllEvents"
  static getAllUsers = "getallUsers"
  static getAllPosts = "getAllPosts"

  static getFeed = "getFeed"
  static createUserUrl="register"
  static logInUserUrl="login"

  private baseUrl: string = "https://theafrisback.appspot.com/";

  constructor(private httpClient: HttpClient) { }


  public post(url, data): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin' : 'http://187.137.41.6:4200/'
      })
    }).pipe(map(data => data));
  }

  public get(url): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + url, {
      headers: new HttpHeaders()
    }).pipe(map(data => data));
  }
}
