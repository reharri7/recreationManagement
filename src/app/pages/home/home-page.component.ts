import {Component} from '@angular/core';
import {Router} from '@angular/router';
import IGame from '../../models/game.model';
import firebase from 'firebase/compat/app';
import {GameService} from '../../services/Game/game.service';
import ITeam from '../../models/team.model';
import {TeamService} from "../../services/Team/team.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  private defaultGame: IGame = {
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  private defaultTeams: ITeam[] = [
    {
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'danger',
      name:'Red Team',
    },
    {
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'secondary',
      name:'Blue Team',
    },
    {
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'tertiary',
      name:'Purple Team',
    },
    {
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'success',
      name:'Green Team',
    },
    {
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'vibrant',
      name:'Yellow Team',
    },
    {
      score: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      color: 'warning',
      name:'Orange Team',
    },
];

  constructor(
    private router: Router,
    private gameService: GameService,
    private teamService: TeamService) {}

  public async routeToGame() {
    await this.router.navigate(['game']);
  }

  public async createDefaultGame() {
    const result = await this.gameService.createGame(this.defaultGame);
    if(result) {
      this.defaultTeams.map(team => {
        team.gameId = result.id;
      });
      await this.teamService.createTeam(this.defaultTeams);
    }
  }
}
