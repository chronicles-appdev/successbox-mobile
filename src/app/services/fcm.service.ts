import { Injectable } from '@angular/core';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { Capacitor } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class FcmService {
  private _redirect = new BehaviorSubject<any>(null);
  get redirect() {
    return this._redirect.asObservable();
  }
  constructor(private storage: StorageService) { }


  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  private async registerPush() {
    try {
      await this.addListeners();

      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();

      }

       if (permStatus.receive !== 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
         throw new Error('user denied permission!');

       }

      await PushNotifications.register();
    } catch (e) {
      console.log(e);
    }
  }

  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList)

  }

  addListeners() {
    PushNotifications.addListener(
      'registration',
      async (token: Token) => {
        console.log('My token:', token);
        const fcm_token = (token?.value);
        let go = 1;
        const saved_token = JSON.parse((await this.storage.getStorage('FCM_TOKEN')).value);
        if (saved_token) {
          if (fcm_token == saved_token) {
            console.log('same token');
            go = 0;
          } else {
            go = 2;
          }
        }

        if (go === 1) {
          this.storage.setStorage('FCM_TOKEN', JSON.stringify(fcm_token));

        } else if (go == 2) {
          const data = {
            expired_token: saved_token,
            refreshed_token: fcm_token
          };
          this.storage.setStorage('FCM_TOKEN', fcm_token)
        }
      }
    );


    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

      // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
     async (notification: PushNotificationSchema) => {
       console.log('Push received: ' + JSON.stringify(notification));
       const data = notification?.data;
       if (data?.redirect) this._redirect.next(data?.redirect);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',

      async (notification: ActionPerformed) => {
       console.log('Push received: ' + JSON.stringify(notification));
       const data = notification.notification.data;
       if (data?.redirect) this._redirect.next(data?.redirect);
      }
    );

  }


  async removeFcmToken() {
    try {
      const saved_token = JSON.parse((await this.storage.getStorage('FCM_TOKEN').value));
      this.storage.removeStorage(saved_token);
    } catch (e) {
      console.log(e);
      throw(e)
    }
  }
}
