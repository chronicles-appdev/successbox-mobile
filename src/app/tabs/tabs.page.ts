import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
paid: any = 'false'
  constructor(private route: Router) { }

  ngOnInit() {
   // this.checkpay()
  }

  checkpay() {

    const check: any = localStorage.getItem('payStatus')
    if (check === 'true') {

      // this.paid = true
     // this.route.navigateByUrl('/tabs/home')

    } else {
        this.route.navigateByUrl('/subscription')
    }
}
}
