import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "../classe/login";

@Injectable({
    providedIn: 'root'
})
export class LoginregisterService {
    private baseUrl="http://localhost:8081/user.login";
    constructor(private HttpClient: HttpClient){}

    loginregister(  login:Login ):Observable<Object>{
        console.log(login);
        return this.HttpClient.post(`${this.baseUrl}`,login);;
        
    }
}