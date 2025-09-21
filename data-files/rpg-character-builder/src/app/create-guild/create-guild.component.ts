import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type GuildType = 'Competitive' | 'Casual' | 'Social' | 'Educational';
type NotifyPref = 'Email' | 'SMS' | 'In-App';

export interface Guild {
  guildName: string;
  description: string;
  type: GuildType;
  notificationPreference: NotifyPref;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="create-guild">
      <h1>Create Guild</h1>
      <p class="intro">
        Form a new guild for your adventurers. Choose a name, describe your focus,
        pick a type, select how members prefer notifications, and confirm terms.
      </p>

      <form class="form" [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <div class="row">
          <div class="field">
            <label for="guildName">Guild Name</label>
            <input id="guildName" type="text" formControlName="guildName" placeholder="e.g., Nightwatch" />
            <div class="err" *ngIf="form.controls['guildName'].touched && form.controls['guildName'].invalid">
              <small *ngIf="form.controls['guildName'].errors?.['required']">Guild name is required.</small>
            </div>
          </div>

          <div class="field">
            <label for="type">Type</label>
            <select id="type" formControlName="type">
              <option *ngFor="let t of types" [ngValue]="t">{{ t }}</option>
            </select>
            <div class="err" *ngIf="form.controls['type'].touched && form.controls['type'].invalid">
              <small *ngIf="form.controls['type'].errors?.['required']">Type is required.</small>
            </div>
          </div>
        </div>

        <div class="field">
          <label for="description">Description</label>
          <textarea id="description" rows="3" formControlName="description"
            placeholder="What is your guild about? Goals, schedule, vibe..."></textarea>
          <div class="err" *ngIf="form.controls['description'].touched && form.controls['description'].invalid">
            <small *ngIf="form.controls['description'].errors?.['required']">Description is required.</small>
          </div>
        </div>

        <fieldset class="field radios">
          <legend>Notification Preference</legend>
          <label><input type="radio" formControlName="notificationPreference" value="Email" /> Email</label>
          <label><input type="radio" formControlName="notificationPreference" value="SMS" /> SMS</label>
          <label><input type="radio" formControlName="notificationPreference" value="In-App" /> In-App</label>
          <div class="err" *ngIf="form.controls['notificationPreference'].touched && form.controls['notificationPreference'].invalid">
            <small *ngIf="form.controls['notificationPreference'].errors?.['required']">Choose a preference.</small>
          </div>
        </fieldset>

        <div class="field terms">
          <label>
            <input type="checkbox" formControlName="acceptTerms" />
            I accept the terms and community guidelines.
          </label>
          <div class="err" *ngIf="form.controls['acceptTerms'].touched && form.controls['acceptTerms'].invalid">
            <small *ngIf="form.controls['acceptTerms'].errors?.['required'] || form.controls['acceptTerms'].errors?.['requiredTrue']">
              You must accept the terms.
            </small>
          </div>
        </div>

        <div class="actions">
          <button type="submit" [disabled]="form.invalid">Create Guild</button>
          <button type="button" class="ghost" (click)="resetForm()">Reset</button>
        </div>
      </form>

      <h2 class="mt">Created Guilds</h2>

      <div class="table-wrap" role="region" aria-labelledby="guilds-caption" tabindex="0">
        <table class="guilds" aria-describedby="guilds-desc">
          <caption id="guilds-caption">Guild Roster</caption>
          <thead>
            <tr>
              <th scope="col">Guild Name</th>
              <th scope="col">Type</th>
              <th scope="col">Notification</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody id="guilds-desc">
            <tr class="guild-row" *ngFor="let g of guilds">
              <th scope="row">{{ g.guildName }}</th>
              <td>{{ g.type }}</td>
              <td>{{ g.notificationPreference }}</td>
              <td>{{ g.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    :host { display:block; }

    h1 { margin: 0 0 .5rem; font-family: Montserrat, sans-serif; color: #e2e8f0; }
    .intro { margin: 0 0 1rem; color: #cbd5e1; font-family: Merriweather, serif; }

    .form {
      display: grid;
      gap: 14px;
      background: rgba(17,24,39,.9);
      padding: 16px;
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,.25);
    }
    .row { display: grid; grid-template-columns: 1fr 220px; gap: 16px; }
    .field { display: grid; gap: 6px; }
    label, legend { font-weight: 700; color: #e5e7eb; font-family: Montserrat, sans-serif; }
    input[type="text"], textarea, select {
      padding: 10px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,.15);
      background: #0b1020; color: #e5e7eb;
    }
    textarea { resize: vertical; }
    .radios { display: grid; gap: 8px; border: 1px dashed rgba(255,255,255,.12); padding: 8px 12px; border-radius: 8px; }
    .terms { margin-top: -2px; }
    .err small { color: #fca5a5; }
    .actions { display: flex; gap: 10px; }
    button {
      padding: 10px 14px; border-radius: 8px; border: 1px solid transparent; cursor: pointer;
      background: #22c55e; color: #06270f; font-weight: 700;
    }
    button:disabled { opacity: .6; cursor: not-allowed; }
    .ghost { background: transparent; color: #e5e7eb; border-color: rgba(255,255,255,.25); border: 1px solid rgba(255,255,255,.25); }

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
    table.guilds {
      border-collapse: collapse;
      width: 100%;
      min-width: 720px;
      color: #e5e7eb;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    }
    caption {
      text-align: left; padding: 8px 4px 12px; color: #93c5fd;
      font-weight: 700; font-family: Montserrat, sans-serif;
    }
    thead th { text-align: left; padding: 10px 12px; border-bottom: 2px solid rgba(255,255,255,.12); }
    tbody th[scope="row"], tbody td { padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,.06); vertical-align: top; }
    tbody tr:nth-child(even) { background: rgba(255,255,255,.03); }

    @media (max-width: 900px) {
      .row { grid-template-columns: 1fr; }
    }
  `]
})
export class CreateGuildComponent {
  types: GuildType[] = ['Competitive', 'Casual', 'Social', 'Educational'];

  // defaults used for reset
  private defaults = {
    guildName: '',
    description: '',
    type: 'Competitive' as GuildType,
    notificationPreference: 'Email' as NotifyPref,
    acceptTerms: false
  };

  form: FormGroup = this.fb.group({
    guildName: ['', Validators.required],
    description: ['', Validators.required],
    type: [this.defaults.type, Validators.required],
    notificationPreference: [this.defaults.notificationPreference, Validators.required],
    acceptTerms: [this.defaults.acceptTerms, Validators.requiredTrue],
  });

  guilds: Guild[] = [];

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.form.invalid) return;

    const value = this.form.value as Guild;
    this.guilds = [...this.guilds, value];

    this.resetForm();
  }

  resetForm(): void {
    this.form.reset(this.defaults);
  }
}

