import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuildListComponent, Guild, GuildType, NotifyPref } from './guild-list/guild-list.component';

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GuildListComponent],
  template: `
    <section class="create-guild">
      <h1>Create Guild</h1>

      <form class="form" [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <div class="row">
          <div class="field">
            <label for="guildName">Guild Name</label>
            <input id="guildName" type="text" formControlName="guildName" />
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
          <textarea id="description" rows="3" formControlName="description"></textarea>
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
          <label><input type="checkbox" formControlName="acceptTerms" /> I accept the terms.</label>
          <div class="err" *ngIf="form.controls['acceptTerms'].touched && form.controls['acceptTerms'].invalid">
            <small *ngIf="form.controls['acceptTerms'].errors?.['requiredTrue']">You must accept the terms.</small>
          </div>
        </div>

        <div class="actions">
          <button type="submit" [disabled]="form.invalid">Create Guild</button>
          <button type="button" class="ghost" (click)="resetForm()">Reset</button>
        </div>
      </form>

      <!-- Child takes list via @Input; can ask parent to clear via @Output -->
      <app-guild-list
        [guilds]="guilds"
        (clearRequested)="onClearGuilds()"
      ></app-guild-list>
    </section>
  `,
  styles: [`
    .form { display: grid; gap: 14px; background: rgba(17,24,39,.9); padding: 16px; border: 1px solid rgba(255,255,255,.08); border-radius: 12px; }
    .row { display: grid; grid-template-columns: 1fr 220px; gap: 16px; }
    .field { display: grid; gap: 6px; }
    .radios { display: grid; gap: 8px; border: 1px dashed rgba(255,255,255,.12); padding: 8px 12px; border-radius: 8px; }
    .actions { display: flex; gap: 10px; }
    button { padding: 10px 14px; border-radius: 8px; border: 1px solid transparent; cursor: pointer; background: #22c55e; color: #06270f; font-weight: 700; }
    .ghost { background: transparent; color: #e5e7eb; border: 1px solid rgba(255,255,255,.25); }
    @media (max-width: 900px) { .row { grid-template-columns: 1fr; } }
  `]
})
export class CreateGuildComponent {
  types: GuildType[] = ['Competitive', 'Casual', 'Social', 'Educational'];

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
    this.guilds = [...this.guilds, this.form.value as Guild];
    this.resetForm();
  }

  resetForm(): void {
    this.form.reset(this.defaults);
  }

  onClearGuilds(): void {
    this.guilds = [];
  }
}


