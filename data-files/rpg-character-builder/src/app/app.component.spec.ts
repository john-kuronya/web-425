import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter, RouterLinkWithHref, Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'players', component: PlayersComponent },
];

describe('AppComponent (routing/nav)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // standalone
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('Should have correct route for PlayersComponent (nav link points to /players)', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // Find an anchor with routerLink="/players"
    const playersLinkDebug = fixture.debugElement
      .queryAll(By.directive(RouterLinkWithHref))
      .find(de => de.injector.get(RouterLinkWithHref).href === '/players');

    expect(playersLinkDebug).toBeTruthy();
  });

  it('Should navigate to PlayersComponent via router (programmatic)', async () => {
    const harness = await RouterTestingHarness.create();
    const instance = await harness.navigateByUrl('/players', PlayersComponent);
    expect(instance).toBeTruthy(); // PlayersComponent became active
  });
});
