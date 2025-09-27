import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GuildListComponent, Guild } from './guild-list.component';

describe('GuildListComponent (IO)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildListComponent],
    }).compileComponents();
  });

  it('should display guilds passed via @Input', () => {
    const fixture = TestBed.createComponent(GuildListComponent);
    const comp = fixture.componentInstance;

    const data: Guild[] = [
      { guildName: 'Nightwatch', description: 'Evening raids', type: 'Competitive', notificationPreference: 'Email', acceptTerms: true },
      { guildName: 'Scholars of Dawn', description: 'Educational runs', type: 'Educational', notificationPreference: 'In-App', acceptTerms: true },
    ];
    comp.guilds = data;

    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr.guild-row'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('Nightwatch');
    expect(rows[1].nativeElement.textContent).toContain('Scholars of Dawn');
  });

  it('should show empty message when guild list is empty', () => {
    const fixture = TestBed.createComponent(GuildListComponent);
    fixture.detectChanges();

    const emptyMsg = fixture.debugElement.query(By.css('[data-testid="empty-guilds"]'));
    expect(emptyMsg).toBeTruthy();
  });

  it('should emit clearRequested when Clear List clicked', () => {
    const fixture = TestBed.createComponent(GuildListComponent);
    const comp = fixture.componentInstance;

    comp.guilds = [{
      guildName: 'Nightwatch', description: 'Evening raids', type: 'Competitive', notificationPreference: 'Email', acceptTerms: true
    }];
    fixture.detectChanges();

    const spy = spyOn(comp.clearRequested, 'emit');
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });
});
