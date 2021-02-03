import { Injectable } from '@angular/core';


import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DbfireService {
  constructor(private angularFirestore: AngularFirestore, private storage:AngularFireStorage) { 

  }
  profileUrl: any;


  public getURL(url: string) {
    const ref = this.storage.ref(url);
    return this.profileUrl = ref.getDownloadURL();
  }
  
}