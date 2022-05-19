import {Component, OnInit} from '@angular/core';
import {ToastService} from '../services/toast.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit {

  public currentNumber = 0;
  constructor(private presentToastService: ToastService) { }

  ngOnInit() {}

  public async incrementTeamScore() {
    if(this.currentNumber < 100) {
      this.currentNumber++;
    } else {
      await this.presentToastService.presentToast('Team score cannot reach 100', 3000, 'danger');
    }
  }

  public async decrementTeamScore() {
    if(this.currentNumber > 0) {
      this.currentNumber--;
    } else {
      await this.presentToastService.presentToast('Team score cannot be below 0', 3000, 'danger');
    }
  }

}
