import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from './../../environments/environment'
import { ArticleService } from './article.service';

const host = environment.kinvey.baseUrl
const appKey = environment.kinvey.appKey
const appSecret = environment.kinvey.appSecret

const url = `${host}/user/${appKey}`
const auth = btoa(`${appKey}:${appSecret}`)

@Injectable()

export class AuthService {

    public currentUser: Object
    public currentAuthToken: string
    
    constructor(private http: HttpClient, private articleService: ArticleService) {}

    register(payload: Object): Observable<any> {

        return this.http.post(url, JSON.stringify(payload), {
            headers: new HttpHeaders()
                .set('Authorization', 'Basic ' + auth)
                .set('Content-Type', 'application/json'),
        })
    }

    login(payload: Object): Observable<any> {

        return this.http.post(url + '/login', JSON.stringify(payload), {
            headers: new HttpHeaders()
                .set('Authorization', 'Basic ' + auth)
                .set('Content-Type', 'application/json')
        })
    }

    isUserLogged(): boolean {

        let isLogged = this.currentAuthToken === sessionStorage.getItem('authToken')
        return isLogged
    }

    logout(): void {

        sessionStorage.clear()
    }

    isUserAdmin(): boolean {

        return this.isUserLogged() && this.currentUser['isAdmin']
    }

}
