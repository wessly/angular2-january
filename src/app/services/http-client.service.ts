import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class HttpClientService {

    constructor(private http: HttpClient) { }

    get<T>(url) {
        return this.http.get<T>(url)
            .pipe()
    }

}
