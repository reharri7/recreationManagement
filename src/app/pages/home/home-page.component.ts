import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private router: Router) {}

  public async routeToGame() {
    await this.router.navigate(['game']);
  }
}
