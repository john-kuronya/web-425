import { TestBed } from '@angular/core/testing';
import { CreateCharacterComponent, Character } from './create-character.component';

type Gender = 'Male' | 'Female' | 'Other';
type CharClass = 'Warrior' | 'Mage' | 'Rogue';

interface CharacterFormModel {
  name: string;
  gender: Gender;
  class: CharClass;
}

describe('CreateCharacterComponent (TDD)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCharacterComponent], // standalone component
    }).compileComponents();
  });

  it('Test 1: should generate a random character ID between 1 and 1000 with no decimal places', () => {
    const fixture = TestBed.createComponent(CreateCharacterComponent);
    const comp = fixture.componentInstance;

    for (let i = 0; i < 25; i++) {
      const id = comp.generateId();
      expect(Number.isInteger(id)).toBeTrue();
      expect(id).toBeGreaterThanOrEqual(1);
      expect(id).toBeLessThanOrEqual(1000);
    }
  });

  it('Test 2: should add a character with correct customization', () => {
    const fixture = TestBed.createComponent(CreateCharacterComponent);
    const comp = fixture.componentInstance;

    // Arrange
    comp.model.name = 'Thorn';
    comp.model.gender = 'Male';
    comp.model.class = 'Warrior';

    // Fake only what onSubmit() needs
    const fakeForm = { resetForm: (_: unknown) => {} } as any;

    // Act
    comp.onSubmit(fakeForm);

    // Assert
    expect(comp.characters.length).toBe(1);
    const added: Character = comp.characters[0];
    expect(added.name).toBe('Thorn');
    expect(added.gender).toBe('Male');
    expect(added.class).toBe('Warrior');
    expect(Number.isInteger(added.id)).toBeTrue();
    expect(added.id).toBeGreaterThanOrEqual(1);
    expect(added.id).toBeLessThanOrEqual(1000);
  });

  it('Test 3: should reset all form fields to default values after resetForm is called', () => {
    const fixture = TestBed.createComponent(CreateCharacterComponent);
    const comp = fixture.componentInstance;

    // Pre-fill with non-defaults
    comp.model.name = 'Lyra';
    comp.model.gender = 'Female';
    comp.model.class = 'Mage';

    // Strongly-typed defaults
    const defaults: CharacterFormModel = { name: '', gender: 'Male', class: 'Warrior' };

    // Spy to ensure correct call
    const fakeForm = { resetForm: jasmine.createSpy('resetForm') } as any;

    // Act
    comp.resetForm(fakeForm);

    // Assert
    expect(fakeForm.resetForm).toHaveBeenCalledWith(defaults);
    expect(comp.model).toEqual(defaults);
  });
});

