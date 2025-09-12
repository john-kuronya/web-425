import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="signin">
      <h1>Sign In</h1>
      <p class="hint">Use a demo user (e.g., <code>aragorn&#64;middle.earth</code> / <code>Ranger#123</code>).</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" placeholder="you@example.com" />
          <div class="err" *ngIf="emailCtrl?.touched && emailCtrl?.invalid">
            <small *ngIf="emailCtrl?.errors?.['required']">Email is required.</small>
            <small *ngIf="emailCtrl?.errors?.['email']">Enter a valid email.</small>
          </div>
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input id="password" type="password" formControlName="password" placeholder="••••••••" />
          <div class="err" *ngIf="passwordCtrl?.touched && passwordCtrl?.invalid">
            <small *ngIf="passwordCtrl?.errors?.['required']">Password is required.</small>
            <small *ngIf="passwordCtrl?.errors?.['pattern']">
              Min 8 chars, one uppercase, one number, one symbol.
            </small>
          </div>
        </div>

        <div class="actions">
          <button type="submit" [disabled]="form.invalid">Sign In</button>
        </div>
      </form>
    </section>
  `,
  styles: [`
    :host { display:block; }
    .signin h1 { margin: 0 0 .5rem; font-family: Montserrat, sans-serif; color: #e2e8f0; }
    .hint { margin: 0 0 1rem; color: #cbd5e1; }
    form { display: grid; gap: 14px; background: rgba(17,24,39,.9); padding: 16px; border: 1px solid rgba(255,255,255,.08); border-radius: 12px; }
    .field { display: grid; gap: 6px; }
    label { font-weight: 700; color: #e5e7eb; }
    input { padding: 10px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,.15); background: #0b1020; color: #e5e7eb; }
    .actions { display: flex; gap: 10px; }
    button { padding: 10px 14px; border-radius: 8px; border: 1px solid transparent; cursor: pointer; background: #22c55e; color: #06270f; font-weight: 700; }
    .err small { color: #fca5a5; }
  `]
})
export class SigninComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
    });
  }

  // Template-friendly getters for form controls
  get emailCtrl(): AbstractControl | null { return this.form.get('email'); }
  get passwordCtrl(): AbstractControl | null { return this.form.get('password'); }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.value as { email: string; password: string };

    if (this.auth.signin(email, password)) {
      this.router.navigate(['/create-character']);
    } else {
      alert('Sign in failed. Please check your email and password.');
    }
  }
}

