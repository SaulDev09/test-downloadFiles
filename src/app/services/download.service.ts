import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  httpOptions: any;

  constructor(private http: HttpClient) { }

  downloadv1(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob',
    });
  }
  download(url: string): Observable<any> {
    // let headers = new HttpHeaders();
    // headers = headers.set('Accept', 'application/pdf');
    // return this.http.get(url, { headers: headers, responseType: 'blob' });

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(url, { headers: headers, responseType: 'blob' as 'json' });
  }
}
