import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, from, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import OpenAI from 'openai';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {

   }

  async getDataFromOpenAPI(text: string) {
   const openai = new OpenAI({
     apiKey: environment.OPENAI_API_KEY,
     dangerouslyAllowBrowser: true,
});
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 30,
    });
   console.log(completion);
   return completion
 }

  getDataFromOpenAI(text: string) {
    const openai = new OpenAI({
      apiKey: environment.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
});
    from(openai.completions.create({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 30,
    })).pipe(
      filter(resp => !!resp ),
      map(resp => resp),
      filter((data: any) => data.choices && data.choices.length > 0 && data.choices[0].text),
      map(data => data.choices[0].text)
    ).subscribe(data => {
      console.log(data);
     // return data
    });
  }
}
