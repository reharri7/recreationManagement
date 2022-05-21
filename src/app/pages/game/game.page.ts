import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../services/Toast/toast.service';
import ITeam from '../../models/team.model';
import IGame from '../../models/game.model';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public currentGame: IGame = {
    docID: '1',
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  public teams: ITeam[] = [
    {
      docID: '1',
      gameId: '1',
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'danger',
      name:'Red Team',
    },
    {
      docID: '2',
      gameId: '1',
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'secondary',
      name:'Blue Team',
    },
    {
      docID: '3',
      gameId: '1',
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'tertiary',
      name:'Purple Team',
    },
    {
      docID: '4',
      gameId: '1',
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'success',
      name:'Green Team',
    },
    {
      docID: '5',
      gameId: '1',
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'vibrant',
      name:'Yellow Team',
    },
    {
      docID: '6',
      gameId: '1',
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'warning',
      name:'Orange Team',
    },
];
  constructor(private presentToastService: ToastService) { }

  ngOnInit() {
  }

  public async incrementTeamScore(team: ITeam) {
    if(team.score < 10000) {
      team.score += 100;
    } else {
      await this.presentToastService.presentToast('Team score cannot reach 100', 3000, 'danger');
    }
  }

  public async decrementTeamScore(team: ITeam) {
    if(team.score > 0) {
      team.score -= 100;
    } else {
      await this.presentToastService.presentToast('Team score cannot be below 0', 3000, 'danger');
    }
  }

}
