import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

type Gender = 'Male' | 'Female' | 'Other';
type CharClass = 'Warrior' | 'Mage' | 'Rogue';

export interface Character {
  id: number;
  name: string;
  gender: Gender;
  class: CharClass;
}

interface CharacterFormModel {
  name: string;
  gender: Gender;
  class: CharClass;
}

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

      <h2 class="mt">Created Characters</h2>

      <div class="table-wrap" role="region" aria-labelledby="created-caption" tabindex="0">
        <table class="roster" aria-describedby="created-desc">
          <caption id="created-caption">Your Character Roster</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Class</th>
            </tr>
          </thead>
          <tbody id="created-desc">
            <tr class="created-row" *ngFor="let c of characters">
              <td>{{ c.id }}</td>
              <td>{{ c.name }}</td>
              <td>{{ c.gender }}</td>
              <td>{{ c.class }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
    .ghost { background: transparent; color: #e5e7eb; border-color: rgba(255,255,255,.25); }

    .mt { margin-top: 18px; }

    .table-wrap {
      margin-top: 8px;
      background: rgba(17,24,39,.9);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 12px;
      padding: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,.25);
      overflow: auto;
    }
    table.roster {
      border-collapse: collapse;
      width: 100%;
      min-width: 520px;
      color: #e5e7eb;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    }
    caption {
      text-align: left; padding: 8px 4px 12px; color: #93c5fd;
      font-weight: 700; font-family: Montserrat, sans-serif;
    }
    thead th { text-align: left; padding: 10px 12px; border-bottom: 2px solid rgba(255,255,255,.12); }
    tbody td { padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,.06); }
    tbody tr:nth-child(even) { background: rgba(255,255,255,.03); }

    @media (max-width: 900px) {
      form { grid-template-columns: 1fr; }
    }
  `]
})
export class CreateCharacterComponent {
  genders: Gender[] = ['Male', 'Female', 'Other'];
  classes: CharClass[] = ['Warrior', 'Mage', 'Rogue'];

  // form model (template-driven)
  model: CharacterFormModel = { name: '', gender: 'Male', class: 'Warrior' };

  // storage for created characters
  characters: Character[] = [];

  // TDD-friendly: expose generateId()
  generateId(): number {
    // integer in [1, 1000]
    return Math.floor(Math.random() * 1000) + 1;
  }

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
}

