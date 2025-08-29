import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PlayersComponent } from './players.component';

describe('PlayersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersComponent], // standalone
    }).compileComponents();
  });

  it('Should create PlayersComponent', () => {
    const fixture = TestBed.createComponent(PlayersComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('Should correctly display a list of characters (10 rows)', () => {
    const fixture = TestBed.createComponent(PlayersComponent);
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr.char-item'));
    expect(rows.length).toBe(10);

    // Spot-check first row content (optional but useful)
    const firstRowText = rows[0].nativeElement.textContent;
    expect(firstRowText).toContain('Thorn'); // name from your seed data
    expect(firstRowText).toContain('Warrior');
  });
});

