import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user-model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirebaseClientService {
  constructor(private firebaseClient: AngularFirestore) {}
  createUser(user: any) {
    return this.firebaseClient
      .collection(environment.firebaseCollections.users)
      .add(user)
      .then((response) => {
        return response;
      });
  }
  getHotels(): Observable<any> {
    return this.firebaseClient
      .collection(environment.firebaseCollections.hotels)
      .snapshotChanges();
  }
  createHotel(hotel: any) {
    return this.firebaseClient
      .collection(environment.firebaseCollections.hotels)
      .add(hotel)
      .then((response) => {
        return response;
      });
  }
  getUser(): Observable<any> {
    return this.firebaseClient
      .collection(environment.firebaseCollections.users)
      .snapshotChanges();
  }
  getMessages() {
    return this.firebaseClient
      .collection(environment.firebaseCollections.helpMessages)
      .snapshotChanges();
  }
  sendMessage(message: any) {
    return this.firebaseClient
      .collection(environment.firebaseCollections.helpMessages)
      .add(message)
      .then((response) => {
        return response;
      });
  }
}
