import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CharacterListComponent, Character } from './character-list.component';

describe('CharacterListComponent (IO)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterListComponent],
    }).compileComponents();
  });

  it('should display characters passed via @Input', () => {
    const fixture = TestBed.createComponent(CharacterListComponent);
    const comp = fixture.componentInstance;

    const data: Character[] = [
      { id: 1, name: 'Thorn', gender: 'Male', class: 'Warrior' },
      { id: 2, name: 'Lyra',  gender: 'Female', class: 'Mage' },
    ];
    comp.characters = data;

    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr.created-row'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('Thorn');
    expect(rows[1].nativeElement.textContent).toContain('Lyra');
  });

  it('should show empty message when character list is empty', () => {
    const fixture = TestBed.createComponent(CharacterListComponent);
    fixture.detectChanges();

    const emptyMsg = fixture.debugElement.query(By.css('[data-testid="empty-characters"]'));
    expect(emptyMsg).toBeTruthy();
  });

  it('should emit clearRequested when Clear List clicked', () => {
    const fixture = TestBed.createComponent(CharacterListComponent);
    const comp = fixture.componentInstance;

    comp.characters = [{ id: 1, name: 'Thorn', gender: 'Male', class: 'Warrior' }];
    fixture.detectChanges();

    const spy = spyOn(comp.clearRequested, 'emit');
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });
});
