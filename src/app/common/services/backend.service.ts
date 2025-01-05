import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

    private _baseUrl = 'http://localhost:3000';

    constructor(private _http: HttpClient) { }

    get(path: string): Observable<any> {
        return this._http.get(`${this._baseUrl}/${path}`);
    } 
}
