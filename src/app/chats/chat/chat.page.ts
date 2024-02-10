

import { Component, ViewChild, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';




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

    this.chat(this.userInput)
    //  this.resData = this.openaiService.main(this.userInput);
    //   console.log(this.resData)

  }



   @ViewChild('contentElement', { static: true }) contentElement!: IonContent;

  scrollToBottom() {
    this.contentElement.scrollToBottom(300); // Adjust the duration as needed
  }
  ngOnInit() {
    this.scrollToBottom();

  }




   adjustTextarea(event: any) {
    // Adjust the number of rows dynamically based on the input content
    const textarea = event.target;
    textarea.rows = textarea.value.split('\n').length;
   }

  chat(message: any) {


      this.openaiService.askOpenai(message).subscribe({
        next: (data) => {


             console.log(data);

        },
        error: (error) => {
           // console.log('Hi 3')
          console.error('Error Fetching Chat:', error);
        }
      });


  }
}
