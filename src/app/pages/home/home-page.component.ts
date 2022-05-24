import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import IGame from '../../models/game.model';
import firebase from 'firebase/compat/app';
import {GameService} from '../../services/Game/game.service';
import ITeam from '../../models/team.model';
import {TeamService} from '../../services/Team/team.service';
import {ToastService} from '../../services/Toast/toast.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public currentGames: IGame[] = [];
  public isLoading = false;

  // TODO: Outsource this to the game and team services. Use the same methods but set this as a default param
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
    private teamService: TeamService,
    private toastService: ToastService) {}

  async ngOnInit() {
      this.isLoading = true;
      await this.getAllGames();
      this.isLoading = false;
    }

  public async routeToGame(id: string) {
    await this.router.navigate(['game', id]);
  }

  public async createDefaultGame() {
    try {
      const result = await this.gameService.createGame(this.defaultGame);
      if(result != null) {
        this.defaultTeams.map(team => {
          team.gameId = result.id;
        });
        const teamsResult = await this.teamService.createTeam(this.defaultTeams);
        if(teamsResult != null) {
          await this.getAllGames();
        } else {
          new Error('Teams result is null');
        }
      }
    } catch(error) {
      await this.toastService.presentToast(error.message() ?? 'Something went wrong. Please try again later', 5000, 'danger');
    }
  }

  convertFirebaseTimestampToDate(incomingTimestamp: any): Date {
    return new Date(incomingTimestamp.seconds * 1000);
  }

  private async getAllGames() {
    try {
      const result = await this.gameService.getGames();
      if(result != null) {
        this.currentGames = [];
        result.docs.map(doc => {
          this.currentGames.push({
            docID: doc.id,
            timestamp: doc.data().timestamp
          });
        });
      }
    } catch(error) {
      await this.toastService.presentToast(error.message() ?? 'Something went wrong. Please try again later', 5000, 'danger');
    }
  }
}
