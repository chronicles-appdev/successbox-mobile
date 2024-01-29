import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  //private apiUrl = 'https://sboxv2.ulearnlms.net/public/api/payment-status'; // Replace with your backend API URL
//api/auth/register
private apiUrl = 'https://sboxv2.ulearnlms.net/public';
private synthesis: SpeechSynthesis = window.speechSynthesis;
  constructor(private http: HttpClient) { }



  speak(text: any) {
    const utterance = new SpeechSynthesisUtterance(text);
    this.synthesis.speak(utterance);
  }

  // pauseReading() {
  //   this.synthesis.pause(); // Pause the speech synthesis
  // }

  // resumeReading() {
  //     this.synthesis.resume(); // Resume the speech synthesis
  // }


  // GET request with optional headers
  public get(endpoint: string, headers?: HttpHeaders): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, { headers });
  }

  // POST request with optional headers
  public post(endpoint: string, data: any, headers?: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data,  headers );
  }


  // POST request
  public postPlain(endpoint: string, data: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }

  // PUT request with optional headers
  public put(endpoint: string, data: any, headers?: HttpHeaders): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, { headers });
  }
}
