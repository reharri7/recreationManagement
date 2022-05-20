import {Component, OnInit} from '@angular/core';
import {ToastService} from '../services/toast.service';
import ITeam from '../models/team.model';
import IGame from '../models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public currentGame: IGame = {
    id: '1',
    teams : [
      {
        id: '1',
        score: 0,
        scoreLastUpdated: new Date(),
        color: 'danger',
        name:'Red Team',
      },
      {
        id: '2',
        score: 0,
        scoreLastUpdated: new Date(),
        color: 'secondary',
        name:'Blue Team',
      },
      {
        id: '3',
        score: 0,
        scoreLastUpdated: new Date(),
        color: 'tertiary',
        name:'Purple Team',
      },
      {
        id: '4',
        score: 0,
        scoreLastUpdated: new Date(),
        color: 'success',
        name:'Green Team',
      },
      {
        id: '5',
        score: 0,
        scoreLastUpdated: new Date(),
        color: 'vibrant',
        name:'Yellow Team',
      },
      {
        id: '6',
        score: 0,
        scoreLastUpdated: new Date(),
        color: 'warning',
        name:'Orange Team',
      },
    ],
    date: new Date()
  };
  public teams: ITeam[] = this.currentGame.teams;
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
