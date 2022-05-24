import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../services/Toast/toast.service';
import ITeam from '../../models/team.model';
import IGame from '../../models/game.model';
import {GameService} from '../../services/Game/game.service';
import {TeamService} from '../../services/Team/team.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public currentGame: IGame;
  public currentTeams: ITeam[] = [];
  public isLoading = false;
  private gameId = '';
  constructor(
    private presentToastService: ToastService,
    private gameService: GameService,
    private teamService: TeamService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.gameId = this.route.snapshot.params.id;
    if(this.gameId) {
      await this.getTeams();
    }
  }

  public async incrementTeamScore(team: ITeam) {
    if(team.score < 10000) {
      team.score += 100;
      await this.teamService.updateTeamScore(team.docID, team);
    } else {
      await this.presentToastService.presentToast('Team score cannot reach 10000', 3000, 'danger');
    }
  }

  public async decrementTeamScore(team: ITeam) {
    if(team.score > 0) {
      team.score -= 100;
    } else {
      await this.presentToastService.presentToast('Team score cannot be below 0', 3000, 'danger');
    }
  }

  public async getTeams() {
    const gameResult = await this.gameService.getGameById(this.gameId);
    if(gameResult != null) {
      gameResult.docs.map(game => {
        this.currentGame = {
          docID: this.gameId,
          ...game.data()
        };
      });
      const teamsResult = await this.teamService.getTeamsByGameId(this.gameId);
      if(teamsResult != null) {
        // @ts-ignore
        this.currentTeams = teamsResult;
        console.log(this.currentTeams);
      }
    }

  }

  convertFirebaseTimestampToDate(incomingTimestamp: any): Date {
    return new Date(incomingTimestamp.seconds * 1000);
  }

}
