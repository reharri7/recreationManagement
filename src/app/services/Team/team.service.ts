import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import ITeam from '../../models/team.model';
import {ToastService} from '../Toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public teamsCollection: AngularFirestoreCollection<ITeam>;
  private teams: ITeam[] = [];

  constructor(
    private db: AngularFirestore,
    private toastService: ToastService) {
    this.teamsCollection = db.collection('teams');
  }

  async createTeam(data: ITeam[]): Promise<firebase.firestore.DocumentData[]> {
    try {
      const batch = this.db.firestore.batch();
      data.map(team => {
        const teamRef = this.teamsCollection.doc().ref;
        batch.set(teamRef, team);
      });
      await batch.commit();
      const teamSnapshot = await firebase.firestore().collection('teams').get();
      return teamSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      await this.toastService.presentToast('Something went wrong please try again later.', 5000, 'danger');
    }
  }

  async deleteTeamsByGameId(gameId: string) {
    const teamRef = this.teamsCollection.ref;
    const teamsByGameIdQuery = teamRef.where('gameId', '==', gameId);
    return await teamsByGameIdQuery.get().then(((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    }));
  }

  async updateTeamScore(team) {
    return await this.teamsCollection.doc(team.id).update(
      {...team, timestamp: firebase.firestore.FieldValue.serverTimestamp()});
  }
}
