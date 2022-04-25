import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginComponentModule {}
