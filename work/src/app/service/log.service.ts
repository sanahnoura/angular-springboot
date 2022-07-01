import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classe/user';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl="http://localhost:8081/user";

  constructor(private httpClient: HttpClient) { }


  users(user: User): Observable<Object>{
    console.log(user);
    return this.httpClient.post(`${this.baseUrl}`,user);

  }
}


