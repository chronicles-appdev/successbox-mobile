import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.page.html',
  styleUrls: ['./congrats.page.scss'],
})
export class CongratsPage implements OnInit {

  topic_id!: any
  constructor(private route: Router, private routeAct: ActivatedRoute) {}

  ngOnInit() {
     this.routeAct.params.subscribe(params => {

      if(this.routeAct){
        this.topic_id = this.routeAct.snapshot.paramMap.get('id')
      }

      });
  }

}
