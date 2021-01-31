import { getUrlScheme } from '@angular/compiler';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DbfireService {

  constructor(private angularFirestore: AngularFirestore, private storage:AngularFireStorage) { 
  

  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.refFromURL(nombreArchivo);
  }

  public uploadImage(nombreCarpeta, nombreArchivo, imagenBase64){
    let storageRef = this.storage.ref(nombreCarpeta).child(nombreArchivo);
    return storageRef.putString("data:image/jpeg;base64,"+imagenBase64, 'data_url');
  }

}