import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, from, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: environment.OPENAI_API_KEY, dangerouslyAllowBrowser: true
});


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl: string = 'https://api.openai.com/v1/completions';


  private openaiApiKey = environment.OPENAI_API_KEY; // Replace with your API key

  constructor(private http: HttpClient) {

  }

  async  main(content: any) {

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: content }],
    model: 'gpt-3.5-turbo',
  });
  console.log(chatCompletion.choices[0])
    return chatCompletion

}



private getOpenaiHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.openaiApiKey}`
  });
}

askOpenai(messages: any[]): Observable<any> {
  const url = 'https://api.openai.com/v1/chat/completions';

  const body = {
    model: 'gpt-3.5-turbo',
    messages
  };

  return this.http.post<any>(url, body, { headers: this.getOpenaiHeaders() })
    .pipe(
      catchError(error => {
        // Handle errors using an appropriate error handling mechanism
        console.error('Error communicating with OpenAI API:', error);
        return throwError(error);
      })
    );
}



}
