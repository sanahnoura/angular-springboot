import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../classe/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isAuth = false;
  userSubject = new Subject<User>();
  user : User  | any;

  constructor(private http: HttpClient) { }

  emitUser(): void{
    this.userSubject.next(this.user);
  }


     

     

  


logout(): void {
    this.user
  this.user = null;
  this.isAuth = false;
  this.userSubject = new Subject<User>();

}






}
