import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {}

  public async logInWithGoogle() {
    await this.authService.signInWithGoogle();
  }
}
