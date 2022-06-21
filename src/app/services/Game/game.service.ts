import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import IGame from '../../models/game.model';
import firebase from 'firebase/compat/app';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public gamesCollection: AngularFirestoreCollection<IGame>;

  constructor(private db: AngularFirestore) {
    this.gamesCollection = db.collection('games');
  }

  async createGame(data: IGame): Promise<DocumentReference<IGame>> {
    return await this.gamesCollection.add(data);
  }

  async getGames() {
    return await firebase.firestore().collection('games').get();
  }

  async deleteGame(id: string) {
    const teamRef = this.gamesCollection.ref;
    const teamsByGameIdQuery = teamRef.where(firebase.firestore.FieldPath.documentId(), '==', id).limit(1);
    return await teamsByGameIdQuery.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  }

  async getGameById(id: string) {
    const teamRef = this.gamesCollection.ref;
    const teamsByGameIdQuery = teamRef.where(firebase.firestore.FieldPath.documentId(), '==', id).limit(1);
    return await teamsByGameIdQuery.get();
  }
}
