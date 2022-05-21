import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/Auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {}

  public async logout(event: Event) {
    console.log('click');
    await this.authService.logout(event);
  }

}
