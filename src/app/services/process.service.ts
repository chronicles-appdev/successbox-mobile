import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProcessService {

  constructor() { }

    private dataSubject = new BehaviorSubject<Boolean>(false);

    data$: Observable<Boolean> = this.dataSubject.asObservable();

   private shelfSubject = new BehaviorSubject<Boolean>(false);

    shelf$: Observable<Boolean> = this.shelfSubject.asObservable();

   private booksSubject = new BehaviorSubject<Boolean>(false);

    books$: Observable<Boolean> = this.booksSubject.asObservable();

   private testsSubject = new BehaviorSubject<Boolean>(false);

  tests$: Observable<Boolean> = this.testsSubject.asObservable();

   private homeSubject = new BehaviorSubject<Boolean>(false);

    home$: Observable<Boolean> = this.homeSubject.asObservable();



    updateData(): void {

      this.dataSubject.next(true);

    }
    updateShelf(): void {

      this.shelfSubject.next(true);

    }
    updateBooks(): void {

      this.booksSubject.next(true);

    }
    updateTests(): void {

      this.testsSubject.next(true);

    }
    updateHome(): void {

      this.homeSubject.next(true);

    }



}
