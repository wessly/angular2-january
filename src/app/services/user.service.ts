import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from './../../environments/environment'

const appSecret = environment.kinvey.appSecret

const appKey = environment.kinvey.appKey
const url = `${environment.kinvey.baseUrl}/user/${appKey}`
const guestAuth = btoa('guest:guest')

@Injectable()

export class UserService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(url, {
            headers: new HttpHeaders({
                'Authorization': 'Basic ' + guestAuth
            })
        })
    }

    update(id: string, payload: Object): Observable<Object> {

        return this.http.put(url + '/' + id, JSON.stringify(payload), {
            headers: new HttpHeaders({
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            })
        })
    }

    delete(id: string): Observable<any> {
        
        return this.http.delete(url + '/' + id + '?hard=true', {
            headers: new HttpHeaders({
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            })
        })
    }
}
