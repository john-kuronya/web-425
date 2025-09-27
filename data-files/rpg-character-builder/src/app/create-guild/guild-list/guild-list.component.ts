import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type GuildType = 'Competitive' | 'Casual' | 'Social' | 'Educational';
export type NotifyPref = 'Email' | 'SMS' | 'In-App';

export interface Guild {
  guildName: string;
  description: string;
  type: GuildType;
  notificationPreference: NotifyPref;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-guild-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mt">Created Guilds</h2>

    <p class="empty" *ngIf="!guilds?.length" data-testid="empty-guilds">
      No guilds yet. Create one to get started.
    </p>

    <div class="table-wrap" *ngIf="guilds?.length">
      <table class="guilds">
        <thead>
          <tr>
            <th>Name</th><th>Type</th><th>Notification</th><th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr class="guild-row" *ngFor="let g of guilds">
            <td>{{ g.guildName }}</td>
            <td>{{ g.type }}</td>
            <td>{{ g.notificationPreference }}</td>
            <td>{{ g.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="actions" *ngIf="guilds?.length">
      <button type="button" (click)="clearRequested.emit()">Clear List</button>
    </div>
  `,
  styles: [`
    .mt { margin-top: 18px; }
    .empty { color: #cbd5e1; margin: 8px 0; font-family: Merriweather, serif; }
    .table-wrap { overflow: auto; border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 12px; }
    table.guilds { border-collapse: collapse; width: 100%; min-width: 720px; color: #e5e7eb; }
    thead th, tbody td { padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,.06); vertical-align: top; }
    tbody tr:nth-child(even) { background: rgba(255,255,255,.03); }
    .actions { margin-top: 10px; }
    button { padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,.25); background: transparent; color: #e5e7eb; cursor: pointer; }
  `]
})
export class GuildListComponent {
  @Input() guilds: Guild[] = [];
  @Output() clearRequested = new EventEmitter<void>();
}
