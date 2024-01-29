import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../services/api.service';
import { ProcessService } from 'src/app/services/process.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {

  class_id!: string | null
  authToken!: any


catData: any[] = [];


  constructor(private processService: ProcessService, private router: Router, private apiService: ApiServiceService,) { }

  ngOnInit() {
    this.authToken = localStorage.getItem('token')
    this.class_id = localStorage.getItem('class_id')
     this.getCategories()


  }


  getCategories(){




    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/user/assessment-categories', headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Categories  successfully Fetched:', data);
             this.catData = data.data

            console.log(this.catData)


          } else {

              console.log(data.message);
            }
        },
        error: (error) => {

          console.error('Error Fetching Categories:', error);
        }
      });


  }


}
