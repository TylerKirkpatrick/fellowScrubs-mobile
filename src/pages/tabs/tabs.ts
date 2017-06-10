import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { GamesPage } from '../games/games';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GamesPage;
  tab2Root = AboutPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
