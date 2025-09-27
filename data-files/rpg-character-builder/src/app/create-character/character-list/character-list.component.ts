import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type Gender = 'Male' | 'Female' | 'Other';
export type CharClass = 'Warrior' | 'Mage' | 'Rogue';

export interface Character {
  id: number;
  name: string;
  gender: Gender;
  class: CharClass;
}

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mt">Created Characters</h2>

    <p class="empty" *ngIf="!characters?.length" data-testid="empty-characters">
      No characters yet. Create your first hero!
    </p>

    <div class="table-wrap" *ngIf="characters?.length" role="region" aria-labelledby="created-caption" tabindex="0">
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

    <div class="actions" *ngIf="characters?.length">
      <button type="button" (click)="clearRequested.emit()">Clear List</button>
    </div>
  `,
  styles: [`
    .mt { margin-top: 18px; }
    .empty { color: #cbd5e1; margin: 8px 0; font-family: Merriweather, serif; }
    .table-wrap {
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
      font-family: Inter, system-ui, Segoe UI, Roboto, sans-serif;
    }
    caption {
      text-align: left; padding: 8px 4px 12px; color: #93c5fd;
      font-weight: 700; font-family: Montserrat, sans-serif;
    }
    thead th { text-align: left; padding: 10px 12px; border-bottom: 2px solid rgba(255,255,255,.12); }
    tbody td { padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,.06); }
    tbody tr:nth-child(even) { background: rgba(255,255,255,.03); }
    .actions { margin-top: 10px; }
    button {
      padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,.25);
      background: transparent; color: #e5e7eb; cursor: pointer;
    }
  `]
})
export class CharacterListComponent {
  @Input() characters: Character[] = [];
  @Output() clearRequested = new EventEmitter<void>();
}
