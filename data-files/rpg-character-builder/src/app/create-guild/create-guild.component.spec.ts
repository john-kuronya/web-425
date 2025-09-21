import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateGuildComponent } from './create-guild.component';

describe('CreateGuildComponent (TDD)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGuildComponent, ReactiveFormsModule], // standalone + reactiveforms
    }).compileComponents();
  });

  it('Test 1: should block submission when form is invalid (required fields & terms)', () => {
    const fixture = TestBed.createComponent(CreateGuildComponent);
    fixture.detectChanges();

    const comp = fixture.componentInstance;

    // form is empty initially -> invalid
    expect(comp.form.invalid).toBeTrue();

    // Try submit
    comp.onSubmit();

    // No guilds should be added
    expect(comp.guilds.length).toBe(0);
  });

  it('Test 2: should require Accept Terms to be checked (Validators.requiredTrue)', () => {
    const fixture = TestBed.createComponent(CreateGuildComponent);
    fixture.detectChanges();

    const comp = fixture.componentInstance;

    // Fill everything EXCEPT acceptTerms
    comp.form.patchValue({
      guildName: 'Nightwatch',
      description: 'A friendly guild for evening raids.',
      type: 'Competitive',
      notificationPreference: 'Email',
      acceptTerms: false
    });

    expect(comp.form.invalid).toBeTrue(); // because acceptTerms is false
    comp.onSubmit();
    expect(comp.guilds.length).toBe(0);

    // Now accept terms and it should pass
    comp.form.patchValue({ acceptTerms: true });
    expect(comp.form.valid).toBeTrue();

    comp.onSubmit();
    expect(comp.guilds.length).toBe(1);
    expect(comp.guilds[0].guildName).toBe('Nightwatch');
  });

  it('Test 3: should add a guild and then reset form to defaults after submit', () => {
    const fixture = TestBed.createComponent(CreateGuildComponent);
    fixture.detectChanges();

    const comp = fixture.componentInstance;

    comp.form.setValue({
      guildName: 'Scholars of Dawn',
      description: 'Lore, builds, and classroom-style practice runs.',
      type: 'Educational',
      notificationPreference: 'In-App',
      acceptTerms: true
    });

    comp.onSubmit();

    // Added correctly
    expect(comp.guilds.length).toBe(1);
    const g = comp.guilds[0];
    expect(g.guildName).toBe('Scholars of Dawn');
    expect(g.type).toBe('Educational');
    expect(g.notificationPreference).toBe('In-App');

    // Form reset to defaults
    const value = comp.form.value as any;
    expect(value.guildName).toBe('');
    expect(value.description).toBe('');
    expect(value.type).toBe('Competitive');           // default in component
    expect(value.notificationPreference).toBe('Email'); // default in component
    expect(value.acceptTerms).toBeFalse();
  });
});

