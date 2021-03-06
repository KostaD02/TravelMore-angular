import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  editHotels(hotel: any, key: string) {
    return this.firebaseClient
      .collection(environment.firebaseCollections.hotels)
      .doc(key)
      .update(hotel);
  }
  editUsers(user: any, key: string) {
    return this.firebaseClient
      .collection(environment.firebaseCollections.users)
      .doc(key)
      .update(user);
  }
  deleteHotel(key: string) {
    return this.firebaseClient
      .collection(environment.firebaseCollections.hotels)
      .doc(key)
      .delete();
  }
  deleteUser(key: string) {
    return this.firebaseClient
      .collection(environment.firebaseCollections.users)
      .doc(key)
      .delete();
  }
  getDocument(collectionName: string, key: string) {
    return this.firebaseClient
      .doc(`${collectionName}/${key}`)
      .snapshotChanges();
  }
  deleteMessage(key: string) {
    return this.firebaseClient
      .collection(environment.firebaseCollections.helpMessages)
      .doc(key)
      .delete();
  }
}
