import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CharacterListComponent, Character } from './character-list/character-list.component';

type Gender = 'Male' | 'Female' | 'Other';
type CharClass = 'Warrior' | 'Mage' | 'Rogue';

interface CharacterFormModel {
  name: string;
  gender: Gender;
  class: CharClass;
}

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [CommonModule, FormsModule, CharacterListComponent],
  template: `
    <section>
      <h1>Create Character</h1>
      <p class="intro">
        Use the form below to create a new character. Choose a name, select gender and class, then submit to add it to your roster.
      </p>

      <!-- customization-section -->
      <div class="customization-section">
        <form #charForm="ngForm" (ngSubmit)="onSubmit(charForm)" novalidate>
          <div class="field">
            <label for="name">Name</label>
            <input id="name"
                   name="name"
                   type="text"
                   required
                   [(ngModel)]="model.name"
                   placeholder="e.g., Thorn" />
          </div>

          <div class="field">
            <label for="gender">Gender</label>
            <select id="gender"
                    name="gender"
                    required
                    [(ngModel)]="model.gender">
              <option *ngFor="let g of genders" [ngValue]="g">{{ g }}</option>
            </select>
          </div>

          <div class="field">
            <label for="class">Class</label>
            <select id="class"
                    name="class"
                    required
                    [(ngModel)]="model.class">
              <option *ngFor="let c of classes" [ngValue]="c">{{ c }}</option>
            </select>
          </div>

          <div class="actions">
            <button type="submit" [disabled]="charForm.invalid">Create</button>
            <button type="button" class="ghost" (click)="resetForm(charForm)">Reset</button>
          </div>
        </form>
      </div>

      <!-- Child component receives data via @Input and can request a clear via @Output -->
      <app-character-list
        [characters]="characters"
        (clearRequested)="onClearCharacters()"
      ></app-character-list>
    </section>
  `,
  styles: [`
    :host { display:block; }
    h1 {
      margin: 0 0 .25rem;
      font-family: Montserrat, sans-serif;
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      color: #e2e8f0;
    }
    .intro { color: #cbd5e1; margin-bottom: 1rem; font-family: Merriweather, serif; }

    .customization-section {
      background: rgba(17,24,39,.9);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,.25);
    }
    form { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: end; }
    .field { display: grid; gap: 6px; }
    label { font-weight: 700; font-family: Montserrat, sans-serif; color: #e5e7eb; }
    input, select {
      padding: 8px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,.15);
      background: #0b1020; color: #e5e7eb;
    }
    input::placeholder { color: #9ca3af; }
    .actions { display: flex; gap: 10px; }
    button {
      padding: 10px 14px; border-radius: 8px; border: 1px solid transparent; cursor: pointer;
      background: #22c55e; color: #06270f; font-weight: 700;
    }
    button:disabled { opacity: .6; cursor: not-allowed; }
    .ghost { background: transparent; color: #e5e7eb; border-color: rgba(255,255,255,.25); border: 1px solid rgba(255,255,255,.25); }

    @media (max-width: 900px) {
      form { grid-template-columns: 1fr; }
    }
  `]
})
export class CreateCharacterComponent {
  genders: Gender[] = ['Male', 'Female', 'Other'];
  classes: CharClass[] = ['Warrior', 'Mage', 'Rogue'];

  model: CharacterFormModel = { name: '', gender: 'Male', class: 'Warrior' };
  characters: Character[] = [];

  generateId(): number { return Math.floor(Math.random() * 1000) + 1; }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    const newCharacter: Character = {
      id: this.generateId(),
      name: this.model.name.trim(),
      gender: this.model.gender,
      class: this.model.class
    };

    this.characters = [...this.characters, newCharacter];
    this.resetForm(form);
  }

  resetForm(form: NgForm): void {
    const defaults: CharacterFormModel = { name: '', gender: 'Male', class: 'Warrior' };
    this.model = { ...defaults };
    form.resetForm(defaults);
  }

  onClearCharacters(): void {
    this.characters = [];
  }
}
