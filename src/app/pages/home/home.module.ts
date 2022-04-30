import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home-page.component';
import {HomePageRoutingModule} from './home-routing.module';
import {GameCardComponent} from '../../game-card/game-card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,
    GameCardComponent,
  ]
})
export class HomePageModule {}
