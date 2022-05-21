import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import ITeam from '../../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public teamsCollection: AngularFirestoreCollection<ITeam>;

  constructor(private db: AngularFirestore) {
    this.teamsCollection = db.collection('teams');
  }

  async createTeam(data: ITeam[]): Promise<firebase.firestore.DocumentData[]> {
    const batch = this.db.firestore.batch();
    console.log(data);
    data.map(team => {
      const teamRef = this.teamsCollection.doc().ref;
      batch.set(teamRef, team);
    });
    await batch.commit();
    const teamSnapshot = await firebase.firestore().collection('teams').get();
    return teamSnapshot.docs.map(doc => doc.data());
  }
}
