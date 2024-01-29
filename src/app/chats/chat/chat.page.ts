

import { Component, ViewChild, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';
import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: "", // This is the default and can be omitted
});


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

    userInput: string = '';
  openaiResponse: string = '';
  resData: any = []
chatCompletion: any
  constructor(private openaiService: ChatService) {}

  sendMessage() {
    if (!this.userInput.trim()) {
      return;
    }
     console.log(this.userInput)
     this.resData = this.openaiService.getDataFromOpenAPI(this.userInput);
      console.log(this.resData)

  }



   @ViewChild('contentElement', { static: true }) contentElement!: IonContent;

  scrollToBottom() {
    this.contentElement.scrollToBottom(300); // Adjust the duration as needed
  }
  ngOnInit() {
    this.scrollToBottom();

    this.main()
     console.log(this.chatCompletion)
  }


    async  main() {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
      });

    }



   adjustTextarea(event: any) {
    // Adjust the number of rows dynamically based on the input content
    const textarea = event.target;
    textarea.rows = textarea.value.split('\n').length;
  }
}
