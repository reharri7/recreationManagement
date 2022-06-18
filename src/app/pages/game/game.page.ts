import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../services/Toast/toast.service';
import ITeam from '../../models/team.model';
import IGame from '../../models/game.model';
import {GameService} from '../../services/Game/game.service';
import {TeamService} from '../../services/Team/team.service';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {onSnapshot} from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})

export class GamePage implements OnInit {
  public teamsCollection: AngularFirestoreCollection<ITeam>;
  public currentGame: IGame;
  public currentTeams: ITeam[] = [];
  public isLoading = false;
  private gameId = '';
  constructor(
    private db: AngularFirestore,
    private presentToastService: ToastService,
    private gameService: GameService,
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {
    this.teamsCollection = db.collection('teams');
  }

  async ngOnInit() {
    this.isLoading = true;
    this.gameId = this.route.snapshot.params.id;
    if(this.gameId) {
      const result = await this.getGame();
      if(result) {
        this.getTeams();
      }
    }
    this.isLoading = false;
  }

  public async incrementTeamScore(team: ITeam) {
    if(team.score < 10000) {
      team.score += 100;
      await this.teamService.updateTeamScore(team);
    } else {
      await this.presentToastService.presentToast('Team score cannot reach 10000', 3000, 'danger');
    }
  }

  public async decrementTeamScore(team: ITeam) {
    if(team.score > 0) {
      team.score -= 100;
      await this.teamService.updateTeamScore(team);
    } else {
      await this.presentToastService.presentToast('Team score cannot be below 0', 3000, 'danger');
    }
  }

  public async getGame() {
    const gameResult = await this.gameService.getGameById(this.gameId);
    if (gameResult != null) {
      gameResult.docs.map(game => {
        this.currentGame = {
          docID: this.gameId,
          ...game.data()
        };
      });
      return true;
    }
    return false;
  }

  public getTeams() {
    const teamRef = this.teamsCollection.ref;
    const teamsByGameIdQuery = teamRef.where('gameId', '==', this.currentGame.docID);
    const unsubscribe = onSnapshot(teamsByGameIdQuery, (snapshot) => {
      const teams: ITeam[] = [];
      snapshot.docs.forEach((doc) => {
        teams.push({ ...doc.data(), id: doc.id});
      });
      this.setTeams(teams);
    });
  }

  public setTeams(teams: ITeam[]): void {
    this.currentTeams = teams;
  }

  convertFirebaseTimestampToDate(incomingTimestamp: any): Date {
    return new Date(incomingTimestamp.seconds * 1000);
  }

}
